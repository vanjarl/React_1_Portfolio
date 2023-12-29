import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import styles from './ShopSearch.module.scss';
import searchIcon from '../../assets/img/search_icon.svg';

import { changeSearchValue } from '../../store/slices/filterSlyce';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const onCloseIcon = () => {
    dispatch(changeSearchValue(''));
    setInputValue('');
    inputRef.current?.focus();
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(changeSearchValue(str));
    }, 250),
    [],
  );

  return (
    <div className={styles.root}>
      <label>
        <img src={searchIcon} alt="пошук" className={styles.searchSVG} />
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Знайти послугу"
          value={inputValue}
          onChange={(event) => onChangeInput(event)}
        />
      </label>
      {inputValue && (
        <img
          src="/closeSearch.svg"
          alt="зачинити"
          className={styles.closeSVG}
          onClick={() => onCloseIcon()}
        />
      )}
    </div>
  );
};

export default Search;
