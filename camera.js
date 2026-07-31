const socket = io();

const video = document.getElementById("localVideo");

const configuration = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        }
    ]
};

const peerConnection = new RTCPeerConnection(configuration);

let stream;

// WebRTC Setup
async function setupPeerConnection() {

    stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
    });

    peerConnection.ontrack = (event) => {
        const remoteVideo = document.getElementById("remoteVideo");
        if (remoteVideo) {
            remoteVideo.srcObject = event.streams[0];
        }
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("ice-candidate", event.candidate);
        }
    };
}

// Camera Start
async function startCamera() {
    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: true
        });

        video.srcObject = stream;

        await setupPeerConnection();

        socket.emit("camera-ready");

    } catch (err) {
        alert("Camera permission is required.");
        console.error(err);
    }
}

// Page Load
window.onload = startCamera;
