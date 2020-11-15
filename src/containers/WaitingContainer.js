import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { joinWaitingRoom, listenJoinUser, disconnectRoom } from '../utils/socket';
import WaitingRoom from '../components/WaitingRoom';

const MASTER_INDEX = 0;

const WaitingContainer = () => {
  const [ users, setUsers ] = useState([]);
  const { name, id } = useSelector((state) => state.user);
  const { game_id } = useParams();
  const isMaster = users[MASTER_INDEX]?.userId === id;

  useEffect(() => {
    joinWaitingRoom({ gameId: game_id, userId: id, username: name });
    listenJoinUser((users) => {
      users[MASTER_INDEX].isMaster = true;
      setUsers(users);
    });

    return () => disconnectRoom({ gameId: game_id });
  }, []);

  return (
    <WaitingRoom
      users={users}
      isMaster={isMaster}
    />
  );
};

export default WaitingContainer;
