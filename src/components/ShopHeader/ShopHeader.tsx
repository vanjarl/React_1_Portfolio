import React, { useEffect, useRef } from 'react';
import Search from '../ShopSearch/ShopSearch';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import style from './ShopHeader.module.scss';
import { RootState } from '../../store/store';

const ShopHeader: React.FC = () => {
  const location = useLocation();
  const isMounted = useRef(false);
  const { totalAmount, totalPrice, items } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (isMounted.current) {
      const cartItemsStr = JSON.stringify(items);
      localStorage.setItem('items', cartItemsStr);
    }
    isMounted.current = true;
  }, [items]);

  if (location.pathname === '/shop/cart') return <></>;

  return (
    <div className={style.root}>
      <div className={`${style.container} container`}>
        <Search />
        <div className={style.cart}>
          <Link to="/shop/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <img src="/cart.svg" alt="кошик" />
            <span>{totalAmount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
