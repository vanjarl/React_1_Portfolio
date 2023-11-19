import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSortType } from '../../store/slices/filterSlyce';
import style from './Sort.module.scss';
import { RootState } from '../../store/store';

type sortItem = {
  name: string;
  sortProperty: string;
};

export const sortList: sortItem[] = [
  { name: 'популярности(по возрастанию)', sortProperty: 'rating' },
  { name: 'популярности(по убыванию)', sortProperty: '-rating' },
  { name: 'цене(по возрастанию)', sortProperty: 'price' },
  { name: 'цене(по убыванию)', sortProperty: '-price' },
  { name: 'алфавиту(по возрастанию)', sortProperty: 'title' },
  { name: 'алфавиту(по убыванию)', sortProperty: '-title' },
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
  const onClickPopup = (obj: sortItem) => {
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
