import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { disconnectRoom, listenUpdateData } from '../utils/socket';

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
    <h1>Camera</h1>
  );
};

export default CameraContainer;
