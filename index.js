require('dotenv').config()
const express = require('express')
const fs = require('fs')
const axios = require('axios').default
if (!process.getuid() == 0) {
    console.log('Please run this daemon as root')
    process.exit(1)
}
if (!fs.existsSync('/var/snap/lxd/common/lxd/unix.socket')) {
    console.log('LXD snap must be installed!')
    process.exit(1)
}
function makeToken(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}
const app = express()
const port = process.env.PORT || 3000
require('express-ws')(app)
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
module.exports.websockets = {
    array: [],
    createVGA: (instance, vncport) => {
        var access_token = makeToken(32)
        module.exports.websockets.array.push({
            type: "vga",
            instance: instance,
            access_token: access_token,
            vncport
        })
        return access_token
    },
    create: (instance, ws, control) => {
        var access_token = makeToken(32)
        module.exports.websockets.array.push({
            type: "serial",
            instance: instance,
            access_token: access_token,
            websocket: ws,
            control: control
        })
        return access_token
    },
    revoke: (token) => {
        module.exports.websockets.array = module.exports.websockets.array.filter(ws => {
            if (ws.access_token != token) {
                ws.control.close()
                ws.websocket.close();
            }
            return ws.access_token != token
        })
        return;
    },
    set_in_use: (token, value, type) => {
        var arr = module.exports.websockets.array
        var wanted_entry = arr.filter(a => a.token == token && a.type == type)[0]
        wanted_entry.in_use = value
        const index = arr.indexOf(wanted_entry);
        if (index > -1) {
            arr.splice(index, 1); // 2nd parameter means remove one item only
        }
        arr.push(wanted_entry)
        module.exports.websockets.array = arr
        return;
    },
    get: (token) => {
        return module.exports.websockets.array.filter(ws => ws.access_token == token)[0]
    },
    getForInstance: (instance) => {
        return module.exports.websockets.array.filter(ws => ws.instance == instance)[0]
    }
}
module.exports.axios = axios.create({ socketPath: "/var/snap/lxd/common/lxd/unix.socket" })
module.exports.extractAxiosError = (error) => {
    if (error.response) {
        return { data: error.response.data, status: error.response.status }
    } else if (error.request) {
        return { data: error.request, status: 500 }
    } else {
        return { data: error.message, status: 500 }
    }
}
app.use('/', require('./routers/index'))

if (process.env.APP_SSL == true) {
    const https = require('https')
    const fs = require('fs')
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT)
    }
    https.createServer(options, app).listen(process.env.APP_PORT, () => {
        console.log(`Server is listening securely on port ${port}`)
    })
} else {
    app.listen(port, () => {
        console.log(`Server is listening insecurely on port ${port}`)
    })
}