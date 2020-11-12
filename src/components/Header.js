import React from 'react';
import styles from './Header.module.scss';

const Header = ({ title }) => {
  return (
    <div className={styles.container}>
      <div>홈</div>
      <div>{ title }</div>
      <div>유저</div>
    </div>
  );
};

export default Header;
