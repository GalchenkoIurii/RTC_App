'use strict';

const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('stopButton');
callButton.disabled = true;
hangupButton.disabled = true;
startButton.addEventListener('click', start);
callButton.addEventListener('click', call);
hangupButton.addEventListener('click', stop);
let startTime;
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

async function start() {
    console.log('Start')
};

async function call() {
    console.log('Calling')
};

async function stop() {
    console.log('Stop')
};


/// Debug functions

localVideo.addEventListener('loadedmetadata', function() {
    console.log(`Local video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
});

remoteVideo.addEventListener('loadedmetadata', function() {
    console.log(`Remote video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
});


//--------------------------------------


let localStream;
let pc1;
let pc2;
const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
};

function getName(pc) {
    return (pc === pc1) ? 'pc1' : 'pc2';
}

function getOtherPc(pc) {
    return (pc === pc1) ? pc2 : pc1;
}


//-------------------------------------------



