import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { disconnectRoom, listenUpdateData } from '../utils/socket';
import CameraWrapper from '../components/CameraWrapper';

const CameraContainer = () => {
  const [gameData, setGameData] = useState(null);
  const { game_id } = useParams();

  useEffect(() => {
    listenUpdateData({ gameId: game_id }, (data) => {
      setGameData(data);
    });

    return () => disconnectRoom({ gameId: game_id });
  }, []);

  return (
    <CameraWrapper />
  );
};

export default CameraContainer;
