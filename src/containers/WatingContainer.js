import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { joinWatingRoom, listenJoinUser, disconnectRoom } from '../utils/socket';
import WatingRoom from '../components/WatingRoom';

const MASTER_INDEX = 0;

const WatingContainer = () => {
  const [ users, setUsers ] = useState([]);
  const { name, id } = useSelector((state) => state.user);
  const { game_id } = useParams();
  const isMaster = users[MASTER_INDEX]?.userId === id;

  useEffect(() => {
    joinWatingRoom({ gameId: game_id, userId: id, username: name });
    listenJoinUser((users) => {
      users[MASTER_INDEX].isMaster = true;
      setUsers(users);
    });

    return () => disconnectRoom({ gameId: game_id });
  }, []);

  return (
    <WatingRoom
      users={users}
      isMaster={isMaster}
    />
  );
};

export default WatingContainer;
