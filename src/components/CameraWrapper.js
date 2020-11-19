import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import styles from './CameraWrapper.module.scss';
import 'react-html5-camera-photo/build/css/index.css';

const CameraWrapper = ({
  gamePhase,
  setGamePhase,
  setIsCardShowing,
  matchPhotoToKeyword,
  setResultMessage,
}) => {
  const handleTakePhotoAnimationDone = async (dataUri) => {
    if (gamePhase === 'quiz') return;
    const result = await matchPhotoToKeyword(dataUri);

    if (result) {
      setGamePhase('quiz');
      setIsCardShowing(true);
      setResultMessage('');
      return;
    }
    setResultMessage('땡!');
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
        />
      }
    </div>
  );
};

export default CameraWrapper;