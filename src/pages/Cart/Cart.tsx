import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAll } from '../../store/slices/cartSlyce';
import styles from './Cart.module.scss';
import CartItem from '../../components/CartItem/CartItem';
import { RootState } from '../../store/store';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalAmount } = useSelector((state: RootState) => state.cart);

  const onDeleteAllItems = () => {
    if (window.confirm('Вы уверены, что хотите удалить все товары?')) dispatch(deleteAll());
  };

  if (totalAmount === 0)
    return (
      <div className={styles.root}>
        <div className={styles.empty}>
          <h2>Корзина пустая</h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src="empty-cart.png" alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    );
  return (
    <div className={styles.root}>
      <div className={styles.cart}>
        <div className={styles.top}>
          <h2 className={styles.title}>
            <img src="cart.svg" alt="cart" />
            Корзина
          </h2>
          <div className={styles.clear}>
            <img src="basket.svg" alt="basket" />

            <span onClick={() => onDeleteAllItems()}>Очистить корзину</span>
          </div>
        </div>
        <div className={styles.items}>
          {items.map((item) => (
            <CartItem
              amount={item.amount}
              id={item.id}
              imageUrl={item.imageUrl}
              price={item.price}
              size={item.size}
              title={item.title}
              type={item.type}
              key={item.id + item.type + item.size}
            />
          ))}
        </div>
        <div className={styles.bottom}>
          <div className={styles.details}>
            <span>
              Всего пицц: <b>{totalAmount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} р</b>
            </span>
          </div>
          <div className={styles.buttons}>
            <Link to="/" className={`button button--outline button--add ${styles.goBackBtn}`}>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
              </svg>
              <span>Вернуться назад</span>
            </Link>
            <div className={`button ${styles.payBtn}`}>
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
