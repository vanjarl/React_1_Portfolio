import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.scss';
import { changePage } from '../../store/slices/filterSlyce';
import { useDispatch } from 'react-redux';

type PaginationProps = {
  currentPage: number;
};

const Paginate: React.FC<PaginationProps> = ({ currentPage }) => {
  const dispatch = useDispatch();
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => dispatch(changePage(e.selected + 1))}
        pageRangeDisplayed={3}
        pageCount={3}
        previousLabel="<"
        forcePage={currentPage - 1}
        // renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Paginate;
