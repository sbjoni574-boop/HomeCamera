// 1. Configuration
const configuration = {
    iceServers: [
        // ...
    ]
};

// 2. Peer connection
const peerConnection = new RTCPeerConnection(configuration);

// 3. Baaki variables
let localStream;
async function setupPeerConnection() {
    // ...
}
// 4. Functions
async function setupPeerConnection() {
  async function setupPeerConnection() {
    localStream = stream;

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        document.getElementById("remoteVideo").srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("ice-candidate", event.candidate);
        }
    };
  }  // ...
}

// 5. Jab camera permission mil jaye tab
// setupPeerConnection();
const socket = io();
const configuration = {
    iceServers: [
        // ...
    ]
};

const peerConnection = new RTCPeerConnection(configuration);
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
