import React from 'react';

import Pagination from 'react-js-pagination';
// import { Container } from './styles';

export default function PaginationComponent({
  currentPage,
  totalPages,
  onChangePage,
}) {
  function handleCurrentPageChange(page) {
    currentPage = page;
    onChangePage(currentPage);
  }

  if (totalPages < 1) {
    return null;
  }

  return (
    <nav aria-label="Page navigation example">
      <Pagination
        activePage={currentPage}
        onChange={handleCurrentPageChange}
        totalItemsCount={totalPages * 20}
        pageRangeDisplayed={10}
        linkClass="page-link"
        firstPageText="Primeira"
        lastPageText="Ultima"
        prevPageText="Anterior"
        nextPageText="Próxima"
        itemClass="page-item"
      />
    </nav>
  );

  // return (
  //   <nav aria-label="Page navigation example">
  //     <ul className="pagination justify-content-center">
  //       <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
  //         <button
  //           type="button"
  //           className="page-link"
  //           tabIndex="0"
  //           onClick={() => handleCurrentPageChange(currentPage - 1)}
  //         >
  //           Anterior
  //         </button>
  //       </li>
  //       {pages.map(item => {
  //         return (
  //           <li
  //             className={`page-item ${currentPage === item ? 'active' : ''}`}
  //             key={item}
  //           >
  //             <button
  //               type="button"
  //               className="page-link"
  //               onClick={() => handleCurrentPageChange(item)}
  //             >
  //               {item}
  //             </button>
  //           </li>
  //         );
  //       })}
  //       <li
  //         className={`page-item ${
  //           totalPages === currentPage ? 'disabled' : ''
  //         }`}
  //       >
  //         <button
  //           type="button"
  //           className="page-link"
  //           onClick={() => handleCurrentPageChange(currentPage + 1)}
  //         >
  //           Próxima
  //         </button>
  //       </li>
  //     </ul>
  //   </nav>
  // );
}
