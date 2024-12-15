const express = require('express');
const app = express();
const path = require('path');
const socketio = require('socket.io');
const fs = require('fs');

var gameinfo = require("./gameinfo/map.json")

// Serve the index.html file when the root path is requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
const server = app.listen(80, () => {
  console.log('Server listening on port 80');
});

const io = socketio(server)

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.emit("worldSize", gameinfo.size, (callback) => {
    socket.emit("worldInfo", gameinfo.info)
  })
})
