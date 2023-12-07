import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './ShopLayout.module.scss';
import Header from '../ShopHeader/ShopHeader';

const ShopLayout = () => {
  return (
    <div className={style.root}>
      <Header />
      <Outlet />
    </div>
  );
};

export default ShopLayout;
