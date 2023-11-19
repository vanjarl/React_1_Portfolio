import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';
import searchIcon from '../../assets/img/header/search_icon.svg';
import closeIcon from '../../assets/img/header/closeSearch_icon.svg';

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
        <img src={searchIcon} alt="search icon" className={styles.searchSVG} />
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Найти пиццу"
          value={inputValue}
          onChange={(event) => onChangeInput(event)}
        />
      </label>
      {inputValue && (
        <img
          src={closeIcon}
          alt="close icon"
          className={styles.closeSVG}
          onClick={() => onCloseIcon()}
        />
      )}
    </div>
  );
};

export default Search;
