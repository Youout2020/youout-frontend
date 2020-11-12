import React from 'react';

import SRC from '../constants/src';
import styles from './Login.module.scss';

const Login = ({ onLogin }) => {
  //TODO: Button component 만들기
  return (
    <div className={styles.container}>
      <img className={styles.splash} src={`${process.env.PUBLIC_URL}${SRC.splash}`} />
      <button className={styles.loginButton} onClick={onLogin}>Continue with Google</button>
    </div>
  );
};

export default Login;
