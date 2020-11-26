/* global kakao */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import Loading from '../components/Loading';
import GameList from '../components/GameList';
import {
  loadGames,
  loadMoreGames,
  toggleIsSelected,
  loadPlayingGames,
  joinGame,
} from '../reducer/game';
import { setRoute } from '../reducer/route';
import { getUserLocation } from '../utils';
import HEADER_TITLE from '../constants/headerTitle';

const GameListContainer = () => {
  const {
    docs,
    hasNextPage,
    isLoading,
    error,
    isSelected,
    playingGameList,
  } = useSelector((state) => state.game);
  const { info } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [ observedTarget, setObservedTarget ] = useState(null);
  const [ address, setAddress ] = useState('');

  const handleJoinWaitingRoom = (id) => dispatch(joinGame(id));
  const handleFilter = () => dispatch(toggleIsSelected());

  const onIntersect = async ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      dispatch(loadMoreGames());
    }
  };

  useEffect(() => {
    if (!observedTarget) return;

    let observer;
    if (observedTarget) {
      observer = new IntersectionObserver(onIntersect, { threshold: [0.1] });
      observer.observe(observedTarget);
    }

    return () => observer.unobserve(observedTarget);
  }, [observedTarget, hasNextPage]);

  useEffect(() => {
    (async () => {
      const { lat, lng } = await getUserLocation();
      const geocoder = new kakao.maps.services.Geocoder();
      const coord = new kakao.maps.LatLng(lat, lng);
      geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
        }
      });
    })();
  }, []);

  useEffect(() => {
    if (!info) return dispatch(setRoute('/'));
    if (docs.length) return dispatch(setRoute('/games'));

    dispatch(loadPlayingGames());
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
              setObservedTarget={setObservedTarget}
              joinWaitingRoom={handleJoinWaitingRoom}
              address={address}
              isSelected={isSelected}
              handleFilter={handleFilter}
            />
          </Header>}
    </>
  );
};

export default GameListContainer;
