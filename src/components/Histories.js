import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

const Histories = ({ histories }) => {
  const history = useHistory();

  return (
    <div>
      <p>내가 플레이한 방</p>
      <div>
        <Button onClick={() => history.push('/histories/:history_id')}/>
        <Button onClick={() => history.push('/histories/:history_id')}/>
        <Button onClick={() => history.push('/histories/:history_id')}/>
        <Button onClick={() => history.push('/histories/:history_id')}/>
      </div>
    </div>
  );
};

export default Histories;
