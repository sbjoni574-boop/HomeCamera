const socket = io();

const video = document.getElementById("localVideo");

let stream;

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: true
        });

        video.srcObject = stream;

        socket.emit("camera-ready");

    } catch (err) {
        alert("Camera permission is required.");
        console.error(err);
    }
}

// Page khulte hi camera permission maange
window.onload = startCamera;
