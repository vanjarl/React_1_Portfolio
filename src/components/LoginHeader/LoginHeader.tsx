import React, { useEffect } from 'react';
import style from './LoginHeader.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout, fetchAuthMe } from '../../store/slices/authSlyce';
import { useLocation } from 'react-router-dom';
import { AppDispatch } from '../../store/store';

const LoginHeader: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchAuthMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {!location.pathname.includes('/create') ? (
          <Link to={location.pathname.includes('shop') ? '/shop/create' : '/blog/create'}>
            <button id="loginButton" className="button">
              {location.pathname.includes('/shop') ? 'Створити послугу' : 'Написати статтю'}
            </button>
          </Link>
        ) : (
          ''
        )}
        <button className={`${style.redButton} button`} onClick={onClickLogout}>
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
          <button className="button">Створити акаунт</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;
