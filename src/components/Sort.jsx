import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSortType } from '../store/slices/filterSlyce';

export const sortList = [
  { name: 'популярности(по возрастанию)', sortProperty: 'rating' },
  { name: 'популярности(по убыванию)', sortProperty: '-rating' },
  { name: 'цене(по возрастанию)', sortProperty: 'price' },
  { name: 'цене(по убыванию)', sortProperty: '-price' },
  { name: 'алфавиту(по возрастанию)', sortProperty: 'title' },
  { name: 'алфавиту(по убыванию)', sortProperty: '-title' },
];

export default function Sort() {
  const rootRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.composedPath().includes(rootRef.current)) {
        setShowPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return document.body.removeEventListener('click', handleClickOutside);
  }, []);
  const [showPopup, setShowPopup] = React.useState(false);
  const dispatch = useDispatch();
  const activeSort = useSelector((state) => state.filter.sortType);
  const onClickPopup = (obj) => {
    dispatch(changeSortType(obj));
    setShowPopup(!showPopup);
  };
  return (
    <div className="sort" ref={rootRef}>
      <div className="sort__label">
        <img src="arrow-top.svg" alt="" />
        <b>Сортировка по:</b>
        <span onClick={() => setShowPopup(!showPopup)}>{activeSort.name}</span>
      </div>
      {showPopup && (
        <div className="sort__popup">
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
}
