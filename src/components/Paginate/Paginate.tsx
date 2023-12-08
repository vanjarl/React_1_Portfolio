import React from 'react';
import ReactPaginate from 'react-paginate';
import './Paginate.scss';

type PaginationProps = {
  currentPage: number;
  amount: number;
  limit: number;
  onChangePage: (page: number) => {};
  className: string;
};

const Paginate: React.FC<PaginationProps> = ({
  currentPage,
  amount,
  limit,
  onChangePage,
  className,
}) => {
  const pageCount = Math.ceil(amount / limit);
  return (
    <ReactPaginate
      className={`paginate ${className} `}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => {
        onChangePage(e.selected + 1);
      }}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
    // </div>
  );
};

export default Paginate;
