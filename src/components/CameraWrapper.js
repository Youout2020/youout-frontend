import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import styles from './CameraWrapper.module.scss';
import 'react-html5-camera-photo/build/css/index.css';
import GameHeader from './GameHeader';

const CameraWrapper = () => {
  const [dataUri, setDataUri] = useState('');

  const handleTakePhotoAnimationDone = (dataUri) => {
    setDataUri(dataUri);
  };

  // 이미지 찍고 Loader 띄우기 (판별하는 동안)
  return (
    <div className={styles.container}>
      {
        dataUri
          ?
          <img className={styles.captureImage} src={dataUri} alt='keyword_image' />
          :
          <>
            <GameHeader />
            <Camera
              onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
              isFullscreen={true}
              isImageMirror={false}
              idealFacingMode={FACING_MODES.ENVIRONMENT}
              imageType={IMAGE_TYPES.JPG}
            />
            <div className={styles.testBox}></div>
          </>
      }
    </div>
  );
};

export default CameraWrapper;
