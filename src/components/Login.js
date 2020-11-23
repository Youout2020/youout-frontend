import React from 'react';

import Splash from './Splash';
import Button from './Button';
import styles from './Login.module.scss';

const Login = ({ onLogin }) => {
  return (
    <div className={styles.container}>
      <Splash>
        <Button
          className='loginButton'
          text='Login with Google'
          onClick={onLogin}
        />
      </Splash>
    </div>
  );
};

export default Login;
