import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import style from './ShopLayout.module.scss';
import ShopHeader from '../ShopHeader/ShopHeader';
import LoginHeader from '../LoginHeader/LoginHeader';

const ShopLayout: React.FC = () => {
  const location = useLocation();
  console.log(location);
  console.log(location.pathname.includes('item'));
  return (
    <div className={style.root}>
      <LoginHeader />
      {location.pathname !== '/shop/create' && !location.pathname.includes('item') && (
        <ShopHeader />
      )}
      <Outlet />
    </div>
  );
};

export default ShopLayout;
