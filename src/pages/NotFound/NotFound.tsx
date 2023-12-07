import React from 'react';

import style from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <div className={style.root}>
        <h1>Ошибка 404</h1>
        <span>Кажеться что-то пошло не так! Страница, которую Вы запрашиваете не существует</span>
      </div>
    </div>
  );
};

export default NotFound;
