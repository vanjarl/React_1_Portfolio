import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, minusItem, deleteItem, deleteAll } from '../../store/slices/cartSlyce';
import styles from './Cart.module.scss';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, totalPrice, totalAmount } = useSelector((state) => state.cart);

  const onDeleteAllItems = () => {
    if (window.confirm('Вы уверены, что хотите удалить все товары?')) dispatch(deleteAll());
  };

  if (totalAmount === 0)
    return (
      <div
        class="container container--cart"
        // {styles.root}
      >
        <div class="cart cart--empty">
          <h2>Корзина пустая</h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src="empty-cart.png" alt="Empty cart" />
          <Link to="/" class="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    );

  return (
    <div className={styles.root}>
      <div className={styles.cart}>
        {/* <div className={styles.cart}> */}
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
          {items.map(
            (obj) =>
              obj.amount && (
                <div className={styles.item} key={obj.id + obj.type + obj.size}>
                  <div className={styles.img}>
                    <img src={obj.imageUrl} alt="Pizza" />
                  </div>
                  <div className={styles.info}>
                    <h3>{obj.title}</h3>
                    <p>
                      {obj.type} тесто, {obj.size} см.
                    </p>
                  </div>
                  <div className={styles.count}>
                    <div
                      onClick={() => dispatch(minusItem(obj))}
                      className="button button--outline button--circle ">
                      <div className={styles.minus}>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"></path>
                          <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"></path>
                        </svg>
                      </div>
                    </div>
                    <b>{obj.amount}</b>
                    <div
                      onClick={() => dispatch(addItem(obj))}
                      className="button button--outline button--circle cart__item-count-plus">
                      <div className={styles.plus}>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"></path>
                          <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={styles.price}>
                    <b>{obj.price * obj.amount} ₽</b>
                  </div>
                  <div onClick={() => dispatch(deleteItem(obj))} className={styles.remove}>
                    <div className="button button--outline button--circle">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                          fill="#EB5A1E"></path>
                        <path
                          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                          fill="#EB5A1E"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ),
          )}
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
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
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
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
          <div className={styles.buttons}>
            <Link to="/" className={styles.goBackBtn}>
              <div className={styles.goBackBtn}></div>
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
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
