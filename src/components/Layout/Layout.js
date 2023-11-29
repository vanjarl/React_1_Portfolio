import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './Layout.module.scss';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div className={style.page}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
