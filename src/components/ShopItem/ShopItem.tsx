import React, { useState } from 'react';
import style from './ShopItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, CartSlyceItem } from '../../store/slices/cartSlyce';
import { RootState } from '../../store/store';
import { FetchedItem } from '../../store/slices/itemsSlyce';
import { Link } from 'react-router-dom';

const Item: React.FC<FetchedItem> = ({ imageUrl, priceList, _id, title }) => {
  const dispatch = useDispatch();
  const cartServices = useSelector((state: RootState) => state.cart.items);
  const isInCart = Boolean(
    useSelector((state: RootState) =>
      state.cart.items.find((item: CartSlyceItem) => item.id === _id),
    ),
  );
  const addItemToCart = () => {
    if (activePriceList) {
      const ItemToCart: CartSlyceItem = {
        id: _id,
        imageUrl: imageUrl,
        title: title,
        price: activePriceList.price[activeDuration],
        duration: activePriceList.duration[activeDuration],
        level: activeLevelOfMentor,
        amount: 0,
      };
      dispatch(addItem(ItemToCart));
    }
  };

  const onActiveLevel = (i: number) => {
    setActiveLevel(i);
  };
  const [activeDuration, setActiveDuration] = useState(0);
  const [activeLevel, setActiveLevel] = useState(0);
  const levelsOfMentor = Object.keys(priceList);
  const activeLevelOfMentor = levelsOfMentor[activeLevel];
  const activePriceList = priceList[activeLevelOfMentor];

  return (
    <div className={style.root}>
      <div className={style.block}>
        <Link to={`/shop/item/${_id}`}>
          <img className={style.image} src={`http://localhost:4444${imageUrl}`} alt="Послуга" />
          <h4 className={style.title}>{title}</h4>
        </Link>
        <div className={style.selector}>
          <span className={style.selectTitle}>Виберіть рівень ментора</span>
          <ul>
            {levelsOfMentor.map((level, i) => (
              <li
                className={i === activeLevel ? 'active' : ''}
                onClick={() => onActiveLevel(i)}
                key={level}>
                {level}
              </li>
            ))}
          </ul>
          <span className={style.selectTitle}>Виберіть тривалість заняття</span>
          <ul>
            {activePriceList?.duration.map((value, i) => (
              <li
                key={value}
                className={activeDuration === i ? 'active' : ''}
                onClick={() => setActiveDuration(i)}>
                {value} хв
              </li>
            ))}
          </ul>
        </div>
        <div className={style.bottom}>
          <div className={style.price}>{activePriceList?.price[activeDuration]} грн</div>
          <button className="button button--outline button--add" onClick={() => addItemToCart()}>
            <img src="/shop-plus.svg" alt="додати послугу" className="svg" />
            <span>Добавить</span>
            {isInCart ? (
              <i>
                {cartServices
                  .filter((el) => _id === el.id)
                  .reduce((sum, el) => {
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
