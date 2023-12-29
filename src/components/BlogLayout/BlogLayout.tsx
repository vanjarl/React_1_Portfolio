import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './BlogLayout.module.scss';
import LoginHeader from '../LoginHeader/LoginHeader';

const BlogLayout: React.FC = () => {
  return (
    <div className={style.root}>
      <LoginHeader />
      <Outlet />
    </div>
  );
};

export default BlogLayout;
