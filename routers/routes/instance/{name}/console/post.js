const { axios, extractAxiosError, websockets } = require('../../../../../')
const ws = require('ws')
const net = require('net')
/** @param {import('express').Request} req  @param {import('express').Response} res */
module.exports = (req, res) => {
    if (req.body.type == "vga") {
        axios.get('/1.0/instances/' + req.params.name).then((response) => {
            var data = response.data
            if (data.metadata.config['user.vncport']) {
                var vncport = parseFloat(data.metadata.config['user.vncport'])
                var access_token = websockets.createVGA(req.params.instance, vncport, req.body.access_token)
                res.send({
                    socket_url: '/api/v1/instance/' + req.params.name + '/console',
                    access_token: access_token
                })
            } else {
                return res.status(400).send({
                    "type": "sync",
                    "status": "Error",
                    "status_code": 400,
                    "error": "Instance does not support vnc / hasnt enabled vnc in their config.",
                    "metadata": {}
                })
            }

        }).catch(err => {
            var error = extractAxiosError(err)
            res.status(error.status).send(error.data)
        })
    } else if (req.body.type == "serial") {
        if (!websockets.getForInstance(req.params.name) || websockets.getForInstance(req.params.name).type != "serial") {
            axios.post('/1.0/instances/' + req.params.name + '/exec', {
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
                var access_token = websockets.create(req.params.name, console_socket, control_socket, req.body.access_token)
                res.send({
                    socket_url: '/api/v1/instance/' + req.params.name + '/console',
                    access_token: access_token
                })
            }).catch(err => {
                var error = extractAxiosError(err)
                res.status(error.status).send(error.data)
            })
        } else {
            var w = websockets.getForInstance(req.params.name)
            res.send({
                socket_url: '/api/v1/instance/' + req.params.name + '/console',
                access_token: w.access_token
            })
        }
    } else if (!req.body.type) {
        return res.status(400).send({
            "type": "sync",
            "status": "Error",
            "status_code": 400,
            "error": "Invalid request body. must contain 'type'",
            "metadata": {}
        })
    } else {
        return res.status(400).send({
            "type": "sync",
            "status": "Error",
            "status_code": 400,
            "error": "Invalid request query. type must be 'vga' or 'serial'",
            "metadata": {}
        })
    }


}