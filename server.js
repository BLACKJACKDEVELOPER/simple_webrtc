const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



//  SOCKET WORKSPACES
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('sendOffer',(data)=> {
  	io.emit(data.FID,data)
  })
  socket.on('sendAnswer',(data)=> {
  	io.emit('Answer'+data.FID,data)
  })
  socket.on('sendICECandidate',(data)=> {
  	console.log(data)
  	io.emit('ICE'+data.FID,data)
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});