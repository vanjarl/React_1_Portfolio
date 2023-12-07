import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './BlogLayout.module.scss';
import LoginHeader from '../LoginHeader/LoginHeader';
// import Header from '../Header/Header';

const BlogLayout = () => {
  return (
    <div className={style.root}>
      <LoginHeader />
      <Outlet />
    </div>
  );
};

export default BlogLayout;
