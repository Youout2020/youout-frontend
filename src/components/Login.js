import React from 'react';

import SRC from '../constants/src';
import styles from './Login.module.scss';

const Login = ({ onLogin }) => {
  return (
    <>
      <img className={styles.splash} src={`${process.env.PUBLIC_URL}${SRC.splash}`} />
      <button onClick={onLogin}>Login</button>
    </>
  );
};

export default Login;
