import React from 'react';
import styles from './UserHeaderNav.module.css';

import { NavLink, useLocation } from 'react-router-dom';
import { useMedia } from '../../hooks/useMedia';

import { FeedSvg } from '../Svgs/FeedSvg';
import { StatsSvg } from '../Svgs/StatsSvg';
import { PostPhotoSvg } from '../Svgs/PostPhotoSvg';
import { LogoutSvg } from '../Svgs/LogoutSvg';

import UserContext from '../../UserContext';

export const UserHeaderNav = () => {
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { userLogout } = React.useContext(UserContext);
  const location = useLocation()

  React.useEffect(() => {
    setMobileMenu(false)
  }, [location])

  const handleClick = () => userLogout();
  const toogleMobileMenu = () => setMobileMenu(!mobileMenu);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          onClick={toogleMobileMenu}
          className={`
            ${styles.mobileButton} 
            ${mobileMenu && styles.mobileButtonActive}
          `}
        />
      )}
      <nav className={`
        ${mobile ? styles.mobileMenu : styles.menu}
        ${mobileMenu && styles.mobileMenuActive}
      `}>
        <NavLink
          to=""
          end
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <FeedSvg />
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink
          to="stats"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <StatsSvg />
          {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink
          to="post"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <PostPhotoSvg />
          {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={handleClick}>
          <LogoutSvg />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};
