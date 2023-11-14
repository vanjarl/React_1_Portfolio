import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.scss';
import { changePage } from '../../store/slices/filterSlyce';
import { useDispatch } from 'react-redux';

export default function Paginate({ currentPage }) {
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
        renderOnZeroPageCount={null}
      />
    </>
  );
}
