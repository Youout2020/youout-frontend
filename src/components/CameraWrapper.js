import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import styles from './CameraWrapper.module.scss';
import 'react-html5-camera-photo/build/css/index.css';

const CameraWrapper = ({
  setDataUri,
  setGamePhase,
  setIsCardShowing,
  matchPhotoToKeyword,
}) => {
  const handleTakePhotoAnimationDone = (dataUri) => {
    setDataUri(dataUri);
    const result = matchPhotoToKeyword();

    if (result) {
      setGamePhase('quiz');
    }
    setIsCardShowing(true);
  };

  return (
    <div className={styles.container}>
      {
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
