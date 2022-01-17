import { Card, Nav, Pagination } from "@themesberg/react-bootstrap";
import React from "react";

export const PaginationTable = (props) => {
  const { currentPage, itemCount, totalItems, totalPages, onChangePage } =
    props;

  const notHasPrev = currentPage === 1;
  const notHasNext = currentPage === totalPages;

  const handleChangePage = (value) => {
    onChangePage && onChangePage(value);
  };

  return (
    <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
      <Nav>
        <Pagination className="mb-2 mb-lg-0">
          <Pagination.Prev
            disabled={notHasPrev}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            Previous
          </Pagination.Prev>
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page}
              active={page + 1 === currentPage}
              onClick={() => handleChangePage(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={notHasNext}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            Next
          </Pagination.Next>
        </Pagination>
      </Nav>
      <small className="fw-bold">
        Showing <b>{itemCount}</b> out of <b>{totalItems}</b> entries
      </small>
    </Card.Footer>
  );
};
