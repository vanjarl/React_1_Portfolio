import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import qs from 'qs';
// import { useNavigate } from 'react-router-dom';

import Caregories from '../components/Caregories';
import Sort from '../components/Sort';
import Item from '../components/Item/Item';
import Skeleton from '../components/Skeleton';
import Paginate from '../components/Paginate/Paginate';
import { SearchContext } from '../App';
import { fetchItems } from '../components/Redux/slices/itemsSlyce';
// import {}

export default function Home() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);
  // const {itemsFromCart } = useSelector((state) => state.cart.items);
  const { searchValue } = useContext(SearchContext);
  const items = useSelector((state) => state.itemsFromBack.items);
  // ---------abbreviation for Fetch-----------------

  useEffect(() => {
    const category = categoryId > 0 ? '&category=' + categoryId : '';
    const sortBy = '&sortBy=' + sortType.sortProperty.replace('-', '');
    const order = '&order=' + (sortType.sortProperty.includes('-') ? 'desc' : 'asc');
    const search = searchValue ? '&search=' + searchValue : '';

    dispatch(fetchItems({ category, sortBy, order, search, currentPage }));
    console.log();
    setIsLoaded(true);

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Caregories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((pizza) => <Item {...pizza} key={pizza.id} />)
          : [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
      </div>
      <Paginate currentPage={currentPage} />
    </div>
  );
}
