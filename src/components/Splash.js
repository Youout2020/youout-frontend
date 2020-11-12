import React from 'react';
import PropTypes from 'prop-types';

import SRC from '../constants/src';
import styles from './Splash.module.scss';

const Splash = ({ children }) => {
  return (
    <div className={styles.container}>
      <img className={styles.splash} src={`${process.env.PUBLIC_URL}${SRC.splash}`} />
      {children}
    </div>
  );
};

Splash.propTypes = {
  children: PropTypes.element,
};

export default Splash;
