import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Header.module.scss';
import { FaHamburger } from 'react-icons/fa';
import { RiUser5Fill } from 'react-icons/ri';
import { setRoute } from '../reducer/route';

const Header = ({ title, children }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.container}>
        <div onClick={() => dispatch(setRoute('/games'))}><FaHamburger size={'1.5em'}/></div>
        <h1>{ title }</h1>
        <div onClick={() => dispatch(setRoute('/user'))}><RiUser5Fill size={'1.5em'}/></div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </>
  );
};

export default Header;
