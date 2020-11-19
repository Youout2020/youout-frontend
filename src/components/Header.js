import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Header.module.scss';
import { FaHome, FaUser } from 'react-icons/fa';

const Header = ({ title, children }) => {
  const history = useHistory();

  return (
    <>
      <div className={styles.container}>
        <div onClick={() => history.push('/games')}><FaHome size={'1.5em'}/></div>
        <div>{ title }</div>
        <div onClick={() => history.push('/user')}><FaUser size={'1.5em'}/></div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </>
  );
};

export default Header;
