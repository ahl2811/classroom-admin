import { Col, Row } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { ModalAddAdmin } from "../components/ModalAddAdmin";
import { SearchBox } from "../components/SearchBox";
import { AdminsTable } from "../components/Tables";

export const AdminsPage = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <SearchBox callback={setSearch} />
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <ModalAddAdmin />
          </Col>
        </Row>
      </div>

      <AdminsTable search={search} />
    </>
  );
};
