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
});

Http.listen(3000, () => {
    console.log("Listening at Port :3000...")
});

