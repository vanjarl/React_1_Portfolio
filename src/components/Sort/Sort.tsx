import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SortBy, changeSortType } from '../../store/slices/filterSlyce';
import style from './Sort.module.scss';
import { RootState } from '../../store/store';

export type SortItem = {
  name: string;
  sortProperty: SortBy;
};

export const sortList: SortItem[] = [
  { name: 'популярности(по возрастанию)', sortProperty: SortBy.RATING_ASC },
  { name: 'популярности(по убыванию)', sortProperty: SortBy.RATING_DESC },
  { name: 'цене(по возрастанию)', sortProperty: SortBy.PRICE_ASC },
  { name: 'цене(по убыванию)', sortProperty: SortBy.PRICE_DESC },
  { name: 'алфавиту(по возрастанию)', sortProperty: SortBy.TITLE_ASC },
  { name: 'алфавиту(по убыванию)', sortProperty: SortBy.TITLE_DESC },
];

const Sort: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !e.composedPath().includes(rootRef.current)) {
        setShowPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return document.body.removeEventListener('click', handleClickOutside);
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
        <img src="arrow-top.svg" alt="" />
        <b>Сортировка по:</b>
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
