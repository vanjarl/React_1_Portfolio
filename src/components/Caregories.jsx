import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { changeCategoryId } from '../store/slices/filterSlyce';

export default function Caregories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const activeId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            onClick={() => dispatch(changeCategoryId(i))}
            key={category}
            className={i === activeId ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
