import React, {useState} from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginator = ({currentPage, pagesCount, portionSize, onPageChange}) => {
    const [portionNumber, setPortionNumber] = useState(1);
    let leftBound = (portionNumber - 1) * portionSize + 1;
    let rightBound = portionNumber * portionSize;
    const portionCount = Math.ceil(pagesCount / portionSize)
    const nextPortion = (e) => {
        setPortionNumber(portionNumber + 1);
    }
    const previousPortion = (e) => {
        setPortionNumber(portionNumber - 1)
    }
    return (
        <Pagination className='pagination justify-content-center'>
            <PaginationItem disabled={portionNumber === 1} key='previous'>
                <PaginationLink previous onClick={previousPortion}>
                    previous
                </PaginationLink>
            </PaginationItem>
            {[...Array(pagesCount+1).keys()].filter((i) => {
                return i >= leftBound && i <= rightBound
            }).map((i) => {
                return (
                    <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={() => onPageChange(i)}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            })}
            <PaginationItem disabled={portionNumber === portionCount} key='next'>
                <PaginationLink next onClick={nextPortion}>
                    next
                </PaginationLink>
            </PaginationItem>
        </Pagination>
        );
}
      
Paginator.defaultProps = {
  pagesCount:1,
  currentPage: 1
};
 
export default Paginator;