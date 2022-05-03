const wss = require('ws')
const net = require('net')
const { axios, extractAxiosError, websockets } = require('../../../../../')
/**@type {import('express-ws').WebsocketRequestHandler} */
module.exports = (ws, req) => {
    console.log('ws')
    var token = req.query.token
    setTimeout(() => {
        console.log(token)
        console.log(websockets.array)
        if (!websockets.get(token)) {
            console.log('invalid')
            return ws.close(1011, 'Invalid token')
        }
        var type = websockets.get(token).type
        if (type == "serial") {
            /**@type {import('ws').WebSocket} */
            var console_socket = websockets.get(token).websocket
            //console.log(console_socket)
            var console_socket_listener = (data) => {
                console.log(data)
                ws.send(data, { binary: true })
            }
            console_socket.on('message', console_socket_listener)
            var ws_listener = (data) => {
                console.log(data)
                console_socket.send(data, { binary: true })
            }
            ws.on('message', ws_listener)
            ws.on('close', () => {
                websockets.revoke(token)
                ws.removeEventListener("message", ws_listener)
                console_socket.removeListener("message", console_socket_listener)
            })
            console_socket.on('close', () => {
                websockets.revoke(token)
                ws.removeEventListener("message", ws_listener)
                console_socket.removeListener("message", console_socket_listener)
            })
        } else if (type == "vga") {
            /**@type {import('net').Socket} */
            var vncport = websockets.get(token).vncport
            var vnc_socket = net.connect({
                port: vncport,
                host: 'localhost'
            })
            var vnc_socket_listener = (data) => {
                ws.send(data, { binary: true })
            }
            vnc_socket.on('data', vnc_socket_listener)
            var ws_listener = (data) => {
                vnc_socket.write(data)
            }
            ws.on('message', ws_listener)
            ws.on('close', () => {
                websockets.revoke(token)
                vnc_socket.destroy()
            })
            vnc_socket.on('close', () => {
                websockets.revoke(token)
                ws.close()
            })
        }
    }, 1000)
  

}