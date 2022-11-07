import React from 'react';
import styles from './Header.module.css';

import { Link } from 'react-router-dom';
import { DogSvg } from './Svgs/DogSvg';

import UserContext from '../UserContext';

export const Header = () => {
  const { user } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.menu}`}>
        <Link to="/" aria-label="Dogs - Home" className={styles.logo}>
          <DogSvg />
        </Link>
        { user ? (
          <Link to="account" className={styles.login}>
            {user.username}
          </Link>
        ) : (
          <Link to="login" className={styles.login}>
            Login | Criar
          </Link>
        )}
      </nav>
    </header>
  );
};
