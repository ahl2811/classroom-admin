import { Button, Card, Table } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getAdmins } from "../api/admins";
import { getClassrooms } from "../api/classroom";
import { getUsers } from "../api/users";
import { Routes } from "../routes";
import { PaginationTable } from "./PaginationTable";

export const ClassroomsTable = (props) => {
  const { search } = props;
  const [page, setPage] = useState(1);

  const { data } = useQuery(["classrooms", page, search], () =>
    getClassrooms({ page, search })
  );

  if (!data || data?.items.length === 0) {
    return <div className="text-center">No results found.</div>;
  }

  const { items, meta } = data;

  const TableRow = (props) => {
    const { name, description, code, subject, section, id } = props;

    return (
      <tr>
        <td>
          <Card.Link className="fw-normal">{code}</Card.Link>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <span className="fw-normal">{description}</span>
        </td>
        <td>
          <span className="fw-normal">{subject}</span>
        </td>
        <td>
          <span className="fw-normal">{section}</span>
        </td>
        <td>
          <Button size="sm" as={Link} to={`${Routes.Classrooms.path}/${id}`}>
            Details
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Code</th>
              <th className="border-bottom">Class Name</th>
              <th className="border-bottom">Description</th>
              <th className="border-bottom">Subject</th>
              <th className="border-bottom">Section</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <TableRow key={`transaction-${t.code}`} {...t} />
            ))}
          </tbody>
        </Table>
        <PaginationTable onChangePage={setPage} {...meta} />
      </Card.Body>
    </Card>
  );
};

export const UsersTable = (props) => {
  const { search } = props;
  const [page, setPage] = useState(1);

  const { data } = useQuery(["users", page, search], () =>
    getUsers({ page, search })
  );

  if (!data || data?.items.length === 0) {
    return <div className="text-center">No results found.</div>;
  }

  const { items, meta } = data;

  const TableRow = (props) => {
    const { name, email, studentId, isRegisteredWithGoogle, status, id } =
      props;

    const statusVariant = status === "Active" ? "text-success" : "text-danger";
    const accTypeVariant = isRegisteredWithGoogle ? "text-warning" : undefined;

    return (
      <tr>
        <td>
          <Card.Link className="fw-normal">{studentId}</Card.Link>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <span className="fw-normal">{email}</span>
        </td>
        <td>
          <span className={`fw-normal ${accTypeVariant}`}>
            {isRegisteredWithGoogle ? "Google" : "Credentials"}
          </span>
        </td>
        <td>
          <span className={`fw-normal ${statusVariant}`}>{status}</span>
        </td>
        <td>
          <Button size="sm" as={Link} to={`${Routes.Users.path}/${id}`}>
            Details
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Student ID</th>
              <th className="border-bottom">Full Name</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Account Type</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <TableRow key={`transaction-${t.code}`} {...t} />
            ))}
          </tbody>
        </Table>
        <PaginationTable onChangePage={setPage} {...meta} />
      </Card.Body>
    </Card>
  );
};

export const AdminsTable = (props) => {
  const { search } = props;
  const [page, setPage] = useState(1);

  const { data } = useQuery(["admins", page, search], () =>
    getAdmins({ page, search })
  );

  if (!data || data?.items.length === 0) {
    return <div className="text-center">No results found.</div>;
  }

  const { items, meta } = data;

  const TableRow = (props) => {
    const { name, email, role, status, id } = props;

    const statusVariant = status === "Active" ? "text-success" : "text-danger";

    return (
      <tr>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <span className="fw-normal">{email}</span>
        </td>
        <td>
          <span className={`fw-normal text-capitalize`}>{role}</span>
        </td>
        <td>
          <span className={`fw-normal ${statusVariant}`}>{status}</span>
        </td>
        <td>
          <Button size="sm" as={Link} to={`${Routes.Users.path}/${id}`}>
            Details
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Full Name</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Role</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <TableRow key={`transaction-${t.code}`} {...t} />
            ))}
          </tbody>
        </Table>
        <PaginationTable onChangePage={setPage} {...meta} />
      </Card.Body>
    </Card>
  );
};
