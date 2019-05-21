import React from 'react';
import s from './Paginator.module.sass';

const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(
          <span
            className={props.currentPage === i && s.selected}
            onClick={e => props.onPageChange(i)}
          >
            {i}
          </span>
        );
    }
    return (
        <div>{pages}</div>
        );
}
 
export default Paginator;