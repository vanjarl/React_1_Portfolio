import React from 'react';
import Search from '../Search/Search';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import style from './Header.module.scss';
import { RootState } from '../../store/store';

const Header: React.FC = () => {
  const location = useLocation();

  const { totalAmount, totalPrice } = useSelector((state: RootState) => state.cart);
  return (
    <div className={style.root}>
      <div className={`${style.container} container`}>
        <Link to="/" className={style.logo}>
          <img width="50" src="logo.png" alt="Mental health logo" />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </Link>
        {location.pathname !== '/cart' && (
          <>
            <Search />
            <div className={style.cart}>
              <Link to="/cart" className="button button--cart">
                <span>{totalPrice} ₽</span>
                <div className="button__delimiter"></div>
                <img src="cart.svg" alt="" />
                <span>{totalAmount}</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
