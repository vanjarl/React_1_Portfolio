import React from 'react';
import style from './Sidebar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBlog } from '@fortawesome/free-solid-svg-icons';
import { faShopify } from '@fortawesome/free-brands-svg-icons';

const Sidebar: React.FC = () => {
  return (
    <div className={style.root}>
      <Link className={style.logo} to="/">
        <img src="/logo.png" alt="logo" />
        <div className={style.sublogo}>IVAN</div>
      </Link>
      <nav>
        <NavLink to="/">
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>
        <NavLink to="/shop" className={style.shop}>
          <FontAwesomeIcon icon={faShopify} color="#4d4d4e" />
        </NavLink>
        <NavLink to="/blog" className={style.blog}>
          <FontAwesomeIcon icon={faBlog} color="#4d4d4e" />
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
