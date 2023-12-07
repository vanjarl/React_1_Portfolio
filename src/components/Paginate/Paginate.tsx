import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.scss';

type PaginationProps = {
  currentPage: number;
  amount: number;
  limit: number;
  onChangePage: (page: number) => {};
};

const Paginate: React.FC<PaginationProps> = ({ currentPage, amount, limit, onChangePage }) => {
  const pageCount = Math.ceil(amount / limit);

  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Paginate;
