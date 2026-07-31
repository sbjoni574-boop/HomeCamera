const socket = io();

// WebRTC Peer Connection
const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
};

const peerConnection = new RTCPeerConnection(configuration);

console.log("RTCPeerConnection created:", peerConnection);

const connectBtn = document.getElementById("connectBtn");
const remoteVideo = document.getElementById("remoteVideo");

// Viewer connect
connectBtn.onclick = () => {
  socket.emit("viewer-ready");
  alert("Viewer Connected");
};

// Camera online
socket.on("camera-ready", () => {
  alert("Camera Online");
});

// Remote video receive
peerConnection.ontrack = (event) => {
  remoteVideo.srcObject = event.streams[0];
};

// Offer receive
socket.on("offer", async (offer) => {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  socket.emit("answer", peerConnection.localDescription);
});

// ICE receive
socket.on("ice-candidate", async (candidate) => {
  if (candidate) {
    try {
      await peerConnection.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    } catch (err) {
      console.error("ICE Error:", err);
    }
  }
});

// ICE send
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit("ice-candidate", event.candidate);
  }
};
