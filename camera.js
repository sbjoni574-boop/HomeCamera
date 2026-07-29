const socket = io();
const video = document.getElementById("localVideo");
const startBtn = document.getElementById("startBtn");

let currentCamera = "environment";
let stream;

async function startCamera() {

    if(stream){
        stream.getTracks().forEach(track=>track.stop());
    }

    stream = await navigator.mediaDevices.getUserMedia({
        video:{
            facingMode:currentCamera
        },
        audio:true
    });

    video.srcObject = stream;
}

startBtn.onclick = startCamera;

document.getElementById("switchBtn").onclick = ()=>{

    currentCamera =
    currentCamera==="environment"
    ?"user":"environment";

    startCamera();

};
