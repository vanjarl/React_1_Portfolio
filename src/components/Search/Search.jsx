import React, { useCallback, useContext, useRef, useState } from 'react';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/header/search_icon.svg';
import closeIcon from '../../assets/img/header/closeSearch_icon.svg';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

export default function Search() {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);

  const onCloseIcon = () => {
    setSearchValue('');
    setInputValue('');
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
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
}
