import React, { useState, useEffect, useRef } from 'react';

import Header from '../components/Header';
import GameList from '../components/GameList';
import api from '../utils/api';
import ROUTE from '../constants/route';
import { getUserLocation } from '../utils';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const GameContainer = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ errMessage, setErrMessage ] = useState('');
  const [ gameList, setGameList ] = useState([]);
  const [ nextGameListToken, setNextGameListToken ] = useState('');
  const [ hasNextPage, setHasNextPage ] = useState(false);
  const [ target, setTarget ] = useState(null);

  const getGameList = async () => {
    try {
      const { lat, lng } = await getUserLocation();
      const response = await api.get({ path: `${ROUTE.games}?type=location&lat=${lat}&lng=${lng}` });
      setNextGameListToken(response.nextPage);
      setHasNextPage(response.hasNextPage);
      setGameList(response.docs);
      setIsLoading(false);
    } catch (err) {
      setErrMessage(err.message);
      history.push(ROUTE.error);
    }
  };

  const getNextGameList = async () => {
    try {
      if (!hasNextPage) return;

      const { lat, lng } = await getUserLocation();
      const response = await api.get({ path: `${ROUTE.games}?type=location&lat=${lat}&lng=${lng}&page=${nextGameListToken}` });
      setNextGameListToken(response.nextPage);
      setHasNextPage(response.hasNextPage);
      setGameList([
        ...gameList,
        ...response.docs,
      ]);
    } catch (err) {
      setErrMessage(err.message);
      history.push(ROUTE.error);
    }
  };

  useEffect(() => {
    (async () => await getGameList())();
  }, []);

  useEffect(() => {
    if (!target) return;

    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: [0.25] });
      observer.observe(target);
    }

    return () => observer.unobserve(target);
  }, [target]);

  const onIntersect = async ([{ isIntersecting }]) => {
    if (isIntersecting) {
      await getNextGameList();
    }
  };

  return (
    <>
      <Header title='너, 나가' />
      <GameList
        list={gameList}
        setTarget={setTarget}
        isLoading={isLoading}
      />
    </>
  );
};

export default GameContainer;
