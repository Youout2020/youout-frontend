import React from 'react';
import { useHistory } from 'react-router-dom';

import ROUTE from '../constants/route';

const Error = ({ message }) => {
  const handleRenderHome = () => {
    useHistory(ROUTE.home);
  };

  return (
    <>
      <div>{message}</div>
      <button onClick={handleRenderHome}>Go Home</button>
    </>
  );
};

export default Error;
