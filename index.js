const express = require('express');
const app = express();
const path = require('path');
const socketio = require('socket.io');
const fs = require('fs');
const { type } = require('os');

const port = 9000

let users

loadFiles()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'game', 'game.json'));
});

// use folder public
app.use(express.static('public'));

// start server
const server = app.listen(port, () => {
    console.log(`Server listening on`, port);
});

// declare websocket server
const io = socketio(server)

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("request", (type, data, callback) => {
        if (type == "login") {
            if (users[data.username]) {
                if (users[data.username].password == data.password) {
                    console.log("correct password")
                } else {
                    console.log("user found, incorrect password")
                    callback("incorrectPassword")
                }
            } else {
                console.log("no user found")
                callback("noUser")
            }
        }

        if (type == "register") {
            if (users[data.username]) {
                callback("userExists")
            }
        }
    })
})

function loadFiles() {
    users = require("./users.json")
}

function saveToFiles() {
    fs.writeFileSync("./users.json", users)

    loadFiles()
}
