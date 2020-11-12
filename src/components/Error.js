import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import ROUTE from '../constants/route';

const Error = ({ message }) => {
  const histoty = useHistory();

  const handleRenderHome = () => {
    histoty.push(ROUTE.home);
  };

  return (
    <>
      <div>{message}</div>
      <button onClick={handleRenderHome}>Go Home</button>
    </>
  );
};

Error.propTypes = {
  message: propTypes.string.isRequired,
};

export default Error;
