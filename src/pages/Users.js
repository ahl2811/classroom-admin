import { Col, Row } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { UsersTable } from "../components/Tables";

export const UsersPage = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col>
            <SearchBox callback={setSearch} />
          </Col>
        </Row>
      </div>

      <UsersTable search={search} />
    </>
  );
};
