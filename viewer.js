const socket = io();

const connectBtn = document.getElementById("connectBtn");

connectBtn.onclick = () => {

    socket.emit("viewer-ready");

    alert("Viewer Connected");

};

socket.on("camera-ready", () => {

    alert("Camera Online");

});
