import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import api from '../utils/api';
import Header from '../components/Header';
import UserPage from '../components/UserPage';

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
  };

  const next = async () => {
    if (!hasNextPage) return;

    const { nextPage, docs, hasNextPage: hasNext } = await api.get({ path: `${path}&limit=${limit}&page=${page}` });

    setPage(nextPage);
    setHasNextPage(hasNext);
    setList([...list, ...docs]);
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

const UserContainer = () => {
  const { image, name, email } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const histories = usePagination();
  const games = usePagination();
  const [ aaa, setHistories ] = useState([
    { id: 1, name: 'test1', clearTime: '123' },
    { id: 2, name: 'test1', clearTime: '123' },
    { id: 3, name: 'test1', clearTime: '123' },
    { id: 4, name: 'test1', clearTime: '123' },
  ]);
  const [bbb, setGames] = useState([
    { id: 1, name: 'test1' },
    { id: 2, name: 'test1' },
    { id: 3, name: 'test1' },
    { id: 4, name: 'test1' },
  ]);
  console.log('histories', histories);
  console.log('games', games);

  useEffect(() => {
    histories.init('/games?type=user&selection=history');
    games.init('/games?type=user&selection=games');
  }, []);

  return (
    <>
      <Header title='내 정보'>
        <UserPage
          image={image}
          name={name}
          email={email}
          histories={histories.payload.list}
          games={games.payload.list}
        />
      </Header>
    </>
  );
};

export default UserContainer;
