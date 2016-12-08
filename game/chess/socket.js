'use strict'

const fs = require('fs')
const http = require('http')
const io = require('socket.io').listen('8888')
const net = require('net')
const HTTP_PORT  = 8888

// const httpServer = http.createServer( (req, res) => {
//     res.writeHead(200, { 'Content-type': 'text/html' });
//     res.end('');
// });
// httpServer.listen(HTTP_PORT, () => {
//     console.log('Server listening at http://localhost:' + HTTP_PORT);
// });


const players = new Set()
const client = {
    p1: '',
    p2: ''
}

io.sockets.on('connection', socket => {
    if(client.p1 && client.p2){
        client.p1 = client.p2 = ''
    }
    if(client.p1){
        console.log('p2 add')
        client.p2 = socket
    }else {
        console.log('p1 add')
        client.p1 = socket
    }
    players.add(socket.id)

    socket.on('tick', data => {
        client.p1.emit('tick-back', data)
        client.p2.emit('tick-back', data)
    });

    socket.on('message', data => {
        console.log('监听message：' + data);
    });
    socket.on('disconnect', ()=>{
        console.log('delete'+ socket.id)
        players.delete(socket.id)
    })
});
