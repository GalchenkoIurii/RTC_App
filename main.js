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
    console.log('Requesting local stream');
    startButton.disabled = true;
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        console.log('Received local stream');
        localVideo.srcObject = stream;
        localStream = stream;
        callButton.disabled = false;
    } catch (e) {
        alert(`getUserMedia() error: ${e.name}`);
    }
};

async function call() {
    // Set buttons state
    callButton.disabled = true;
    hangupButton.disabled = false;
    console.log('Starting call');
    // Getting and show info about media-streams
    const videoTracks = localStream.getVideoTracks();
    const audioTracks = localStream.getAudioTracks();
    if (videoTracks.length > 0) {
        console.log(`Using video device: ${videoTracks[0].label}`);
    }
    if (audioTracks.length > 0) {
        console.log(`Using audio device: ${audioTracks[0].label}`);
    }

    // Creating RTCPeerConnection objects with empty configuration
    const configuration = {};
    console.log('RTCPeerConnection configuration:', configuration);
    pc1 = new RTCPeerConnection(configuration);
    console.log('Created local peer connection object pc1');
    pc2 = new RTCPeerConnection(configuration);
    console.log('Created remote peer connection object pc2');

    // Adding ICE-candidate event handlers
    pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e));
    pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e));

    // Second connection stream adding handler
    pc2.addEventListener('track', gotRemoteStream);

    // Getting streams from current stream-object and put it in RTCPeerConnection object
    localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));
    console.log(localStream.getTracks());

    // Creating offer from pc1
    try {
        console.log('pc1 createOffer start');
        const offer = await pc1.createOffer(offerOptions);
        await onCreateOfferSuccess(offer);
    } catch (e) {
        console.log(`${e}`);
    }
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



