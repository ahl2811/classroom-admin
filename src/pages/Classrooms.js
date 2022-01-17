import { faCheck, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Row,
} from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { ClassroomsTable } from "../components/Tables";

// code: "e9j381lw";
// description: "Dess";
// id: "9301ef2e-3feb-4fb0-81fd-ae67535fa8b3";
// name: "WEBNC";
// room: null;
// section: "";
// subject: "";

export const ClassroomsPage = () => {
  const [search, setSearch] = useState("");
  console.log("search", search);
  return (
    <>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <SearchBox callback={setSearch} />
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  Show
                </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10{" "}
                  <span className="icon icon-small ms-auto">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <ClassroomsTable search={search} />
    </>
  );
};
