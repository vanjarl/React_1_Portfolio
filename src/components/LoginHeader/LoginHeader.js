import React from 'react';
import style from './LoginHeader.module.scss';
import { Link } from 'react-router-dom';

const LoginHeader = () => {
  const isAuth = true;
  return isAuth ? (
    <div className={`${style.root} `}>
      <div className={`${style.loginBlock}`}>
        <Link to="/auth">
          <button id="loginButton" className="button">
            Увійти
          </button>
        </Link>
        <Link to="/registration">
          <button id="signupButton" className="button">
            Створити аккаунт
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <div className={`${style.root} `}>
      <div className={`${style.loginBlock}`}>
        <Link to="/blog/create">
          <button id="loginButton" className="button">
            Написати статтю
          </button>
        </Link>
        <button id="signupButton" className={`${style.redButton} button`}>
          Вийти
        </button>
      </div>
    </div>
  );
};

export default LoginHeader;
