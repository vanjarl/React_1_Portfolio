import React, { useRef, useState } from 'react';
import styles from './ShopAddPrice.module.scss';
import { PriceList } from '../../pages/AddShopItem/AddShopItem';

interface ShopAddPriceProps {
  priceList: PriceList;
  setPriceList: React.Dispatch<React.SetStateAction<PriceList>>;
}

const ShopAddPrice: React.FC<ShopAddPriceProps> = ({ priceList, setPriceList }) => {
  const [duration, setDuration] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [durationError, setDurationError] = useState<string>('');
  const [priceError, setPriceError] = useState<string>('');

  const selectRef = useRef<HTMLSelectElement>(null);

  const handleAddPrice = () => {
    if (selectRef.current && !durationError && !priceError) {
      const mentorLevel = selectRef.current.value;

      if (priceList[mentorLevel]?.price?.includes(Number(price))) {
        setPriceError('Зазначена вартість вже встановлена');
      }
      if (priceList[mentorLevel]?.duration?.includes(duration)) {
        setDurationError('Зазначена тривалість вже встановлена');
      } else if (price && duration) {
        setPriceList((prevPriceList) => {
          if (prevPriceList[mentorLevel]) {
            return {
              ...prevPriceList,
              [mentorLevel]: {
                price: [...prevPriceList[mentorLevel].price, Number(price)],
                duration: [...prevPriceList[mentorLevel].duration, duration],
              },
            };
          } else {
            return {
              ...prevPriceList,
              [mentorLevel]: {
                price: [Number(price)],
                duration: [duration],
              },
            };
          }
        });

        clearData();
      }
    }
  };

  const clearData = () => {
    setDuration('');
    setPrice('');
    setDurationError('');
    setPriceError('');
  };

  const validateDuration = (value: number) => {
    if (value >= 45 && value <= 240 && Number.isInteger(value)) {
      setDurationError('');
    } else {
      setDurationError('Введіть ціле число від 45 до 240');
    }
  };

  const validatePrice = (value: number) => {
    if (value >= 100 && value <= 10000 && Number.isInteger(value)) {
      setPriceError('');
    } else {
      setPriceError('Введіть ціле число від 100 до 10000');
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.inputGroup}>
        <label htmlFor="selectLevel" className={styles.label}>
          Виберіть рівень ментора
        </label>
        <select name="selectLevel" ref={selectRef}>
          <option value="middle">Middle</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="duration" className={styles.label}>
          Довжина заняття (хв)
        </label>
        <input
          type="text"
          id="duration"
          value={duration}
          onChange={(e) => {
            validateDuration(Number(e.target.value));
            setDuration(e.target.value);
          }}
          // ref={inputDurationRef}
          className={styles.input}
        />
      </div>
      <div className={styles.helperText}>{durationError}</div>
      <div className={styles.inputGroup}>
        <label htmlFor="price" className={styles.label}>
          Ціна заняття (грн)
        </label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => {
            validatePrice(Number(e.target.value));
            setPrice(e.target.value);
          }}
          className={styles.input}
        />
      </div>
      <div className={styles.helperText}>{priceError}</div>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handleAddPrice}
          className={`${styles.button}`}
          disabled={!(price && duration && !priceError && !durationError)}>
          Додати ціну заняття
        </button>
        <button type="button" onClick={() => setPriceList({})} className={`${styles.button}`}>
          Очистити прайс-лист
        </button>
      </div>
      {Object.keys(priceList).length > 0 && (
        <div className={styles.priceListInfo}>
          <h2>Ціни занять </h2>
          <div className={styles.priceTable}>
            <div className={styles.cell}>Рівень</div>
            <div className={styles.cell}>Тривалість(хв)</div>
            <div className={styles.cell}>Вартість(грн)</div>
            {Object.keys(priceList).map((level) => (
              <React.Fragment key={level}>
                {priceList[level].price.map((price, index) => (
                  <React.Fragment key={`${level}_${price}_${duration}`}>
                    <div className={styles.cell}>{level}</div>
                    <div className={styles.cell}>{priceList[level].duration[index]}</div>
                    <div className={styles.cell}>{price}</div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopAddPrice;
