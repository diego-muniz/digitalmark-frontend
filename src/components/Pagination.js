import React from 'react';

// import { Container } from './styles';

export default function Pagination({ currentPage, totalPages, onChangePage }) {
  function handleCurrentPageChange(page) {
    currentPage = page;
    onChangePage(currentPage);
  }

  if (totalPages < 1) {
    return null;
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            tabIndex="0"
            onClick={() => handleCurrentPageChange(currentPage - 1)}
          >
            Anterior
          </button>
        </li>
        {Array.from({ length: totalPages }, (item, index) => (
          <li
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            key={index + 1}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => handleCurrentPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            totalPages === currentPage ? 'disabled' : ''
          }`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => handleCurrentPageChange(currentPage + 1)}
          >
            Próxima
          </button>
        </li>
      </ul>
    </nav>
  );
}
