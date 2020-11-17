import React, { useEffect, useState, useRef } from 'react';
import styles from './Camera.module.scss';
import Cameraa from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const captureOptions = {
  audio: false,
  video: { width: '100vw', height: '100vh', facingMode: 'user' },
};

const Camera = () => {
  const [dataUri, setDataUri] = useState('');

  function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    setDataUri(dataUri);
  }
  console.log(dataUri)
  const isFullscreen = false;
  return (
    <div>
      {
        (dataUri)
          ? <h1>ee</h1>
          : <Cameraa onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={isFullscreen}
          />
      }
    </div>
  );
};

export default Camera;

// import React from 'react';

// class Camera extends React.Component {
//   constructor(props) {
//     super(props);
//     this.streamCamVideo= this.streamCamVideo.bind(this)
//   }
//   streamCamVideo() {
//     var constraints = { audio: true, video: { width: 1280, height: 720 } };

//     if (navigator.mediaDevices === undefined) {
//       navigator.mediaDevices = {};
//     }

//     if (navigator.mediaDevices.getUserMedia === undefined) {
//       navigator.mediaDevices.getUserMedia = (constraints) => {
//         const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

//         if (!getUserMedia) {
//           return Promise.reject(new Error('getUserMedia is not implemented'));
//         }

//         return new Promise((resolve, reject) => {
//           getUserMedia.call(navigator, constraints, resolve, reject);
//         });
//       }
//     }

//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then(function(mediaStream) {
//         var video = document.querySelector("video");

//         video.srcObject = mediaStream;
//         video.onloadedmetadata = function(e) {
//           video.play();
//         };
//       })
//       .catch(function(err) {
//         console.log(err.name + ": " + err.message);
//       }); // always check for errors at the end.
//   }
//   render() {
//     return (
//       <div>
//         <div id="container">
//           <video autoPlay={true} playsInline={true} id="videoElement" controls></video>
//         </div>
//         <br/>
//         <button onClick={this.streamCamVideo}>Start streaming</button>
//       </div>
//     );
//   }
// }

// export default Camera;
