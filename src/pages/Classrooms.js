import { Col, Row } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { ClassroomsTable } from "../components/Tables";

export const ClassroomsPage = () => {
  const [search, setSearch] = useState("");
  console.log("search", search);
  return (
    <>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col>
            <SearchBox callback={setSearch} />
          </Col>
        </Row>
      </div>

      <ClassroomsTable search={search} />
    </>
  );
};
