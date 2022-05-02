const { axios, extractAxiosError, websockets } = require('../../../../../')
const ws = require('ws')
/** @param {import('express').Request} req  @param {import('express').Response} res */
module.exports = (req, res) => {
    if (!websockets.getForInstance(req.params.name)) {
        axios.post('/1.0/instances/'+req.params.name+'/exec', {
            "command": [
              "/bin/bash"
            ],
            "cwd": "/root",
            "environment": {
                "TERM": "xterm-color"
            },
            "interactive": true,
            "wait-for-websocket": true,
          }).then(response => {
            var data = response.data
            var console_path = data.operation + "/websocket?secret=" + data.metadata.metadata.fds["0"];
            var control_path = data.operation + "/websocket?secret=" + data.metadata.metadata.fds["control"];
            var console_socket = new ws.WebSocket("ws+unix:///var/snap/lxd/common/lxd/unix.socket:" + console_path);
            var control_socket = new ws.WebSocket("ws+unix:///var/snap/lxd/common/lxd/unix.socket:" + control_path);
            var access_token = websockets.create(req.params.name, console_socket, control_socket)
            res.send({
                socket_url: '/api/v1/instance/'+req.params.name+'/console',
                access_token: access_token
            })
        }).catch(err => {
            var error = extractAxiosError(err)
            res.status(error.status).send(error.data)
        })
    } else {
        var w = websockets.getForInstance(req.params.name)
        res.send({
            socket_url: '/api/v1/instance/'+req.params.name+'/console',
            access_token: w.access_token
        })
    }
    
}