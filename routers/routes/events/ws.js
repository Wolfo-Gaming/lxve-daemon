const wss = require('ws')
/**@type {import('express-ws').WebsocketRequestHandler} */
module.exports = (ws, req) => {
    console.log('ws')
    /**@type {import('ws').WebSocket} */
    var events_ws = new wss.WebSocket("ws+unix:///var/snap/lxd/common/lxd/unix.socket:/1.0/events?type=logging")
    events_ws.on('open', () => console.log('ok'))
    events_ws.on('message', (data) => {
        //console.log(data.toString())
        ws.send(data.toString())
    })
    ws.on('message', (data) => {
        //console.log(data.toString())
        events_ws.send(data.toString())
    })

    ws.on('close', () => {
        events_ws.close()
    })
}