import React from 'react';
import styles from './Header.module.scss';
import { FaHome, FaUser } from 'react-icons/fa';
import { setRoute } from '../reducer/route';
import { useDispatch } from 'react-redux';

const Header = ({ title, children }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.container}>
        <div onClick={() => dispatch(setRoute('/games'))}><FaHome size={'1.5em'}/></div>
        <div>{ title }</div>
        <div onClick={() => dispatch(setRoute('/user'))}><FaUser size={'1.5em'}/></div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </>
  );
};

export default Header;
