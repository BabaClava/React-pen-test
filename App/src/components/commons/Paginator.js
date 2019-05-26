import React from 'react';
import s from './Paginator.module.sass';

const Paginator = (props) => {
    let pages = [];

    for (let i = 1; i <= props.pagesCount; i++) {
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
      
Paginator.defaultProps = {
  pagesCount:1,
  currentPage: 1
};
 
export default Paginator;