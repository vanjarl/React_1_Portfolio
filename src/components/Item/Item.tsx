import React, { useState } from 'react';
import style from './Item.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '../../store/slices/cartSlyce';
import { RootState } from '../../store/store';
import { CartSlyceItem } from '../../store/slices/cartSlyce';
import { FetchedItem } from '../../store/slices/itemsSlyce';
import { Link } from 'react-router-dom';

const Item: React.FC<FetchedItem> = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const item = useSelector((state: RootState) =>
    state.cart.items.find((item: CartSlyceItem) => item.id === props.id),
  );

  const addItemtoCart = () => {
    const ItemToCart: CartSlyceItem = {
      id: props.id,
      imageUrl: props.imageUrl,
      title: props.title,
      price: props.price,
      size: props.sizes[activeSize],
      type: types[activeType],
      amount: 0,
    };
    dispatch(addItem(ItemToCart));
  };

  const onActiveType = (i: number) => {
    setActiveType(i);
  };
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const types = ['тонкое', 'традиционное'];

  return (
    <div className={style.root}>
      <div className={style.block}>
        <Link to={`/item/${props.id}`}>
          <img className={style.image} src={props.imageUrl} alt="Pizza" />
          <h4 className={style.title}>{props.title}</h4>
        </Link>
        <div className={style.selector}>
          <ul>
            {props.types.map((typeId, i) => (
              <li
                className={i === activeType ? 'active' : ''}
                onClick={() => onActiveType(i)}
                key={typeId}>
                {types[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {props.sizes.map((size, index) => (
              <li
                className={activeSize === index ? 'active' : ''}
                onClick={() => setActiveSize(index)}
                key={size}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className={style.bottom}>
          <div className={style.price}>от {props.price} ₽</div>
          <button className="button button--outline button--add" onClick={() => addItemtoCart()}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {item ? (
              <i>
                {items
                  .filter((el: any) => item.id === el.id)
                  .reduce((sum: any, el: any) => {
                    return sum + el.amount;
                  }, 0)}
              </i>
            ) : (
              ''
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
