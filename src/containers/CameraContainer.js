import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { disconnectRoom, listenUpdateData } from '../utils/socket';
import { updateCurrentGame } from '../reducer/currentGame';

const CameraContainer = () => {
  const dispatch = useDispatch();
  const gameInfo = useSelector((state) => state.currentGame);
  const { game_id } = useParams();

  useEffect(() => {
    listenUpdateData((data) => {
      dispatch(updateCurrentGame(data));
    });

    return () => disconnectRoom({ gameId: game_id });
  }, []);

  return (
    <h1>{gameInfo && gameInfo._id}</h1>
  );
};

export default CameraContainer;
