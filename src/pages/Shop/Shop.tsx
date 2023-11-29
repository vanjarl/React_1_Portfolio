import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import Item from '../../components/Item/Item';
import Skeleton from '../../components/Skeleton';
import Paginate from '../../components/Paginate/Paginate';
import { StatusOfFetch, fetchItems } from '../../store/slices/itemsSlyce';
import { changeFilters } from '../../store/slices/filterSlyce';
import { sortList } from '../../components/Sort/Sort';
import style from './Shop.module.scss';
import { AppDispatch, RootState } from '../../store/store';

const Shop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const { items, status } = useSelector((state: RootState) => state.itemsFromBack);
  const isQueryString = useRef(false);
  const isMounted = useRef(false);

  const fetchData = () => {
    const category = categoryId > 0 ? '&category=' + categoryId : '';
    const sortBy = '&sortBy=' + sortType.sortProperty.replace('-', '');
    const order = '&order=' + (sortType.sortProperty.includes('-') ? 'desc' : 'asc');
    const search = searchValue ? '&search=' + searchValue : '';
    dispatch(fetchItems({ category, sortBy, order, search, currentPage }));
  };

  // срабатывает, если при рендере у нас были заданы поисковые параметры.
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortType = sortList.find((el) => {
        return el.sortProperty === params.sortProperty;
      });

      if (sortType) {
        params.sortType = sortType;
      }
      dispatch(
        changeFilters({
          ...params,
        }),
      );
      isQueryString.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // не срабатывает при первом рендере (isMounted===false). Вшивает наши поисковые параметры в адресную строку
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (!isQueryString.current) fetchData();
    window.scrollTo(0, 0);
    isQueryString.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className={`${style.root} container`}>
      <div className={`${style.withoutPagination} container`}>
        <div className={style.top}>
          <Categories />
          <Sort />
        </div>
        <h2 className={style.title}>Все пиццы</h2>
        {status === StatusOfFetch.ERROR ? (
          <div className={style.error}>
            <h2>Загрузка товаров не удалась</h2>
            <p>
              Приносим свои извинения за временные неудобства
              <br />
              Попробуйте повторить попытку позже.
            </p>
          </div>
        ) : (
          <div className={style.items}>
            {status === StatusOfFetch.LOADING
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map((pizza) => <Item {...pizza} key={pizza._id} />)}
          </div>
        )}
        <div />
      </div>
      <Paginate currentPage={currentPage} />
    </div>
  );
};

export default Shop;
