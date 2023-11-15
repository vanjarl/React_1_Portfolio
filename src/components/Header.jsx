import React from 'react';
import Search from './Search/Search';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

export default function Header() {
  const { totalAmount, totalPrice } = useSelector((state) => state.cart);
  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img width="38" src="./img/pizza-logo.svg" alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <img src="cart.svg" alt="" />
            <span>{totalAmount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
