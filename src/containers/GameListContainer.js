import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import GameList from '../components/GameList';
import HEADER_TITLE from '../constants/headerTitle';
import { loadGames, loadMoreGames } from '../reducer/game';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { mockData } from '../utils/mock';
import { setRoute } from '../reducer/route';
import Loading from '../components/Loading';

const GameListContainer = () => {
  const { docs, hasNextPage, isLoading, error } = useSelector((state) => state.game);
  const { info } = useSelector((state) => state.user);
  const [ target, setTarget ] = useState(null);
  const [ playingGameList, setPlayingGameList ] = useState(mockData);
  const dispatch = useDispatch();

  const handleJoinWaitingRoom = (id) => dispatch(setRoute(`/games/${id}`));
  const onIntersect = async ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      dispatch(loadMoreGames());
    }
  };

  useEffect(() => {
    if (!target) return;

    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: [0.1] });
      observer.observe(target);
    }

    return () => observer.unobserve(target);
  }, [target, hasNextPage]);

  useEffect(() => {
    if (!info) return dispatch(setRoute('/'));
    if (docs.length) return dispatch(setRoute('/games'));

    dispatch(loadGames());
  }, []);

  return (
    <>
      {error}
      {isLoading
        ? <Loading />
        : <Header title={HEADER_TITLE.games}>
            <GameList
              gameList={docs}
              playingGameList={playingGameList}
              setTarget={setTarget}
              joinWaitingRoom={handleJoinWaitingRoom}
            />
          </Header>}
    </>
  );
};

export default GameListContainer;
