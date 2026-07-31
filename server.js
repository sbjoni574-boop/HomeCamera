const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.static(__dirname));

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    // Camera online
    socket.on("camera-ready", () => {
        socket.broadcast.emit("camera-ready");
    });

    // Viewer online
    socket.on("viewer-ready", () => {
        socket.broadcast.emit("viewer-ready");
    });

    // WebRTC Offer
    socket.on("offer", (offer) => {
        socket.broadcast.emit("offer", offer);
    });

    // WebRTC Answer
    socket.on("answer", (answer) => {
        socket.broadcast.emit("answer", answer);
    });

    // ICE Candidate
    socket.on("ice-candidate", (candidate) => {
        socket.broadcast.emit("ice-candidate", candidate);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id);
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server Running:", PORT);
});
