import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = ({ title, children }) => {
  const history = useHistory();

  return (
    <>
      <div className={styles.container}>
        <div onClick={() => history.push('/games')}>홈</div>
        <div>{ title }</div>
        <div onClick={() => history.push('/user')}>유저</div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </>
  );
};

export default Header;
