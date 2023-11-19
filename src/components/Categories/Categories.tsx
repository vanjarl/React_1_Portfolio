import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { changeCategoryId } from '../../store/slices/filterSlyce';
import styles from './Categories.module.scss';
import { RootState } from '../../store/store';

const Categories: React.FC = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const activeId = useSelector((state: RootState) => state.filter.categoryId);
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
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
};

export default Categories;
