import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import GameList from '../components/GameList';
import api from '../utils/api';
import ROUTE from '../constants/route';
import PATH from '../constants/path';
import HEADER_TITLE from '../constants/headerTitle';
import { getUserLocation } from '../utils';
import { initGame, addNextGame } from '../reducer/game';
import { joinWaitingRoom } from '../utils/socket';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { mockData } from '../utils/mock';

const GameContainer = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ errMessage, setErrMessage ] = useState('');
  const [ target, setTarget ] = useState(null);

  const [ playingGameList, setPlayingGameList ] = useState(mockData);
  const games = useSelector((state) => state.game);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onIntersect = async ([{ isIntersecting }]) => {
    if (isIntersecting && games.hasNextPage) {
      const { lat, lng } = await getUserLocation();
      const path = PATH.gamesLocation({ lat, lng, page: games.nextPage});
      const { docs, nextPage, hasNextPage } = await api.get({ path });

      dispatch(addNextGame({ docs, nextPage, hasNextPage }));
    }
  };

  const handleJoinWaitingRoom = (id) => {
    history.push(`/games/${id}`);
  };

  useEffect(() => {
    if (!target) return;

    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: [0.1] });
      observer.observe(target);
    }

    return () => observer.unobserve(target);
  }, [target]);

  useEffect(() => {
    if (games.docs.length) return setIsLoading(false);

    (async () => {
      try {
        const { lat, lng } = await getUserLocation();
        const path = PATH.gamesLocation({ lat, lng });
        const { docs, nextPage, hasNextPage } = await api.get({ path });
        dispatch(initGame({ docs, nextPage, hasNextPage }));
        setIsLoading(false);
      } catch (err) {
        setErrMessage(err.message);
        history.push(ROUTE.error);
      }
    })();
  }, []);

  return (
    <>
      <Header title={HEADER_TITLE.games}>
        <GameList
          gameList={games.docs}
          playingGameList={playingGameList}
          setTarget={setTarget}
          isLoading={isLoading}
          joinWaitingRoom={handleJoinWaitingRoom}
        />
      </Header>
    </>
  );
};

export default GameContainer;
