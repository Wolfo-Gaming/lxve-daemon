const wss = require('ws')
const { axios, extractAxiosError, websockets } = require('../../../../../')
/**@type {import('express-ws').WebsocketRequestHandler} */
module.exports = (ws, req) => {
    console.log('ws')
    var token = req.query.token
   
    if (!websockets.get(token)) {
        console.log('invalid')
        return ws.close(1011, 'Invalid token')
    }
     /**@type {import('ws').WebSocket} */
    var console_socket = websockets.get(token).websocket
    //console.log(console_socket)
    console_socket.on('message', (data) => {
        console.log(data)
        ws.send(data, {binary:true})
    })
    ws.on('message', (data) => {
        console.log(data)
        console_socket.send(data, {binary:true})
    })
    ws.on('close', () => {
        console_socket.close()
    })
    console_socket.on('close', () => {
        ws.close()
    })
}