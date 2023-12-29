import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SortBy, changeSortType } from '../../store/slices/filterSlyce';
import style from './ShopSort.module.scss';
import { RootState } from '../../store/store';

export type SortItem = {
  name: string;
  sortProperty: SortBy;
};

export const sortList: SortItem[] = [
  { name: 'популярності (за зростанням)', sortProperty: SortBy.RATING_ASC },
  { name: 'популярності (за спаданням)', sortProperty: SortBy.RATING_DESC },
  { name: 'ціні (за зростанням)', sortProperty: SortBy.PRICE_ASC },
  { name: 'ціні (за спаданням)', sortProperty: SortBy.PRICE_DESC },
  { name: 'алфавіту (за зростанням)', sortProperty: SortBy.TITLE_ASC },
  { name: 'алфавіту (за спаданням)', sortProperty: SortBy.TITLE_DESC },
];

const Sort: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (rootRef.current && !e.composedPath().includes(rootRef.current)) {
      setShowPopup(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const [showPopup, setShowPopup] = React.useState(false);
  const dispatch = useDispatch();
  const activeSort = useSelector((state: RootState) => state.filter.sortType);
  const onClickPopup = (obj: SortItem) => {
    dispatch(changeSortType(obj));
    setShowPopup(!showPopup);
  };
  return (
    <div className={style.root} ref={rootRef}>
      <div className={style.label}>
        <img src="/arrow-top.svg" alt="стрілка вверх" />
        <b>Сортувати по:</b>
        <span onClick={() => setShowPopup(!showPopup)}>{activeSort.name}</span>
      </div>
      {showPopup && (
        <div className={style.popup}>
          <ul>
            {sortList.map((obj) => (
              <li
                className={obj === activeSort ? 'active' : ''}
                key={obj.name}
                onClick={() => onClickPopup(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
