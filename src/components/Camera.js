// import React, { useEffect, useState, useRef } from 'react';

// const captureOptions = {
//   audio: false,
//   video: { facingMode: 'user' },
// };

// const useUserMedia = (requestedMedia) => {
//   const [mediaStream, setMediaStream] = useState(null);

//   useEffect(() => {
//     const enableStream = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
//       setMediaStream(stream);
//     };

//     if (!mediaStream) {
//       enableStream();
//     } else {
//       return () => {
//         mediaStream.getTracks().forEach((track) => {
//           track.stop();
//         });
//       };
//     }
//     return mediaStream;
//   }, [mediaStream, requestedMedia]);
// };

// const Camera = () => {
//   const videoRef = useRef();
//   const mediaStream = useUserMedia(captureOptions);

//   console.log(mediaStream);
//   if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
//     videoRef.current.srcObject = mediaStream;
//   }

//   const handleCanPlay = () => {
//     videoRef.current.play();
//   };

//   return (
//     <>
//       <video ref={videoRef} onCanPlay={handleCanPlay} style={{ width: '100%', height: '100%' }} autoPlay={true} playinline='true' muted />
//     </>
//   );
// };

// export default Camera;

import React from 'react';

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.streamCamVideo= this.streamCamVideo.bind(this)
  }
  streamCamVideo() {
    var constraints = { audio: false, video: { width: 1280, height: 720 } };

    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = (constraints) => {
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented'));
        }

        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        var video = document.querySelector("video");

        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      }); // always check for errors at the end.
  }
  render() {
    return (
      <div>
        <div id="container">
          <video autoPlay={true} playsInline={true} id="videoElement" controls></video>
        </div>
        <br/>
        <button onClick={this.streamCamVideo}>Start streaming</button>
      </div>
    );
  }
}

export default Camera;