import React from 'react';
import styles from './NotFoundBlock.module.scss';

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>Ошибка 404</h1>
      <span>Кажеться что-то пошло не так! Страница, которую Вы запрашиваете не существует</span>
    </div>
  );
}
