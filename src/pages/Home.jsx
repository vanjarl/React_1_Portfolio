import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Caregories from '../components/Caregories';
import Sort from '../components/Sort';
import Item from '../components/Item/Item';
import Skeleton from '../components/Skeleton';
import Paginate from '../components/Paginate/Paginate';
import { SearchContext } from '../App';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);
  // const {itemsFromCart } = useSelector((state) => state.cart.items);
  const { searchValue } = useContext(SearchContext);

  // ---------abbreviation for Fetch-----------------
  const category = categoryId > 0 ? '&category=' + categoryId : '';
  const sortBy = '&sortBy=' + sortType.sortProperty.replace('-', '');
  const order = '&order=' + (sortType.sortProperty.includes('-') ? 'desc' : 'asc');
  const search = searchValue ? '&search=' + searchValue : '';
  //!------------Pagination

  useEffect(() => {
    axios
      .get(
        `https://6453758ee9ac46cedf25d56d.mockapi.io/items?page=${currentPage}&limit=4${category}${sortBy}${order}${search}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoaded(true);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  // TODO: опыты с адресной строкой
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sortType.sortProperty,
  //     categoryId,
  //     currentPage,
  //   });
  //   navigate(queryString);
  // }, [categoryId, sortType, searchValue, currentPage]);
  // TODO: опыты с адресной строкой

  return (
    <div className="container">
      <div className="content__top">
        <Caregories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? pizzas.map((pizza) => <Item {...pizza} key={pizza.id} />)
          : [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
      </div>
      <Paginate currentPage={currentPage} />
    </div>
  );
}
