import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import styles from './CameraWrapper.module.scss';
import 'react-html5-camera-photo/build/css/index.css';

const CameraWrapper = ({
  dataUri,
  setDataUri,
}) => {
  const handleTakePhotoAnimationDone = (dataUri) => {
    // 카메라 판별 진행 + Loader 띄어주기
    setDataUri(dataUri);
  };

  return (
    <div className={styles.container}>
      {
        dataUri
          ?
          <img className={styles.captureImage} src={dataUri} alt='keyword_image' />
          :
          <Camera
            onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
            isFullscreen={true}
            isImageMirror={false}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            imageType={IMAGE_TYPES.JPG}
            imageCompression={0.5}
          />
      }
    </div>
  );
};

export default CameraWrapper;
