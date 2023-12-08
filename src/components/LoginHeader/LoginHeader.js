import React, { useEffect } from 'react';
import style from './LoginHeader.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout, fetchAuthMe } from '../../store/slices/authSlyce';

const LoginHeader = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  const onClickLogout = () => {
    if (window.confirm('Ви насправді хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return isAuth ? (
    <div className={`${style.root} `}>
      <div className={`${style.loginBlock}`}>
        <Link to="/blog/create">
          <button id="loginButton" className="button">
            Написати статтю
          </button>
        </Link>
        <button id="signupButton" className={`${style.redButton} button`} onClick={onClickLogout}>
          Вийти
        </button>
      </div>
    </div>
  ) : (
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
  );
};

export default LoginHeader;
