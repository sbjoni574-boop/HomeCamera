// Viewer connected
socket.on("viewer-ready", async () => {
    try {
        const offer = await peerConnection.createOffer();

        await peerConnection.setLocalDescription(offer);

        socket.emit("offer", peerConnection.localDescription);

        console.log("Offer Sent");
    } catch (err) {
        console.error(err);
    }
});

// Answer receive
socket.on("answer", async (answer) => {
    try {
        await peerConnection.setRemoteDescription(
            new RTCSessionDescription(answer)
        );

        console.log("Answer Received");
    } catch (err) {
        console.error(err);
    }
});

// ICE Candidate receive
socket.on("ice-candidate", async (candidate) => {
    try {
        if (candidate) {
            await peerConnection.addIceCandidate(
                new RTCIceCandidate(candidate)
            );
        }
    } catch (err) {
        console.error(err);
    }
});
