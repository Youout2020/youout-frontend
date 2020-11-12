import React from 'react';

import SRC from '../constants/src';
import styles from './Splash.module.scss';

const Splash = () => {
  return (
    <img className={styles.splash} src={`${process.env.PUBLIC_URL}${SRC.splash}`} />
  );
};

export default Splash;
