import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import GameList from '../components/GameList';
import api from '../utils/api';
import ROUTE from '../constants/route';
import { getUserLocation } from '../utils';
import { initGame, addNextGame } from '../reducer/game';
import Button from '../components/Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const usePagination = (option) => {
  const [path, setPath] = useState('');
  const [list, setList] = useState([]);
  const [page, setPage] = useState(option?.page || DEFAULT_PAGE);
  const [hasNextPage, setHasNextPage] = useState(true);
  const limit = option?.limit || DEFAULT_LIMIT;

  const init = async (path) => {
    const { docs, nextPage, hasNextPage } = await api.get({ path: `${path}&limit=${limit}&page=${page}` });
    setPath(path);
    setList(docs);
    setPage(nextPage);
    setHasNextPage(hasNextPage);

    return { docs, nextPage, hasNextPage };
  };

  const next = async () => {
    if (!hasNextPage) return;

    const { nextPage, docs, hasNextPage: hasNext } = await api.get({ path: `${path}&limit=${limit}&page=${page}` });

    setPage(nextPage);
    setHasNextPage(hasNext);
    setList([...list, ...docs]);

    return { nextPage, docs, hasNextPage: hasNext };
  };

  return {
    payload: {
      list,
      page,
      hasNextPage,
    },
    init,
    next,
  };
};

const GameContainer = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ errMessage, setErrMessage ] = useState('');
  const [ target, setTarget ] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const gameList = usePagination();

  useEffect(() => {
    (async () => {
      try {
        const { lat, lng } = await getUserLocation();
        const response = await gameList.init(`${ROUTE.games}?type=location&lat=${lat}&lng=${lng}`);
        dispatch(initGame(response));
        setIsLoading(false);
      } catch (err) {
        setErrMessage(err.message);
        history.push(ROUTE.error);
      }
    })();
  }, []);

  const onIntersect = async ([{ isIntersecting }]) => {
    if (isIntersecting) {
      const response = await gameList.next();
      dispatch(addNextGame(response));
    }
  };

  useEffect(() => {
    if (!target) return;

    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: [0.25] });
      observer.observe(target);
    }

    return () => observer.unobserve(target);
  }, [target]);

  return (
    <>
      <Header title='너, 나가'>
        <GameList
          list={gameList.payload.list}
          setTarget={setTarget}
          isLoading={isLoading}
        />
      </Header>
    </>
  );
};

export default GameContainer;
