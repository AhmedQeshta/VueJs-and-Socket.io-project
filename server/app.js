const Express = require("express")();
const Http = require("http").Server(Express);

const SocketIo = require("socket.io")(Http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});


let position = {x: 250, y: 250,};

SocketIo.on("connection", socket => {
    socket.emit("position", position);
    socket.on("move", data => {
        switch (data) {
            case "left" :
                position.x -= 5;
                SocketIo.emit("position", position);
                break;
            case "right" :
                position.x += 5;
                SocketIo.emit("position", position);
                break;
            case "up" :
                position.y -= 5;
                SocketIo.emit("position", position);
                break;
            case "down" :
                position.y += 5;
                SocketIo.emit("position", position);
                break;
        }
    })
    socket.on("chat_messages", (message) => {
        socket.broadcast.emit("chat_messages", message);
    })
    socket.on("joined", (name) => {
        socket.broadcast.emit("joined", name);
    })
    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    })
    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping')
    })
});

Http.listen(3000, () => {
    console.log("Listening at Port :3000...")
});

