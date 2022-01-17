import {
  faEllipsisH,
  faEye,
  faLockOpen,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  Table,
} from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { getAdmins } from "../api/admins";
import { getClassrooms } from "../api/classroom";
import { getUsers, updateUserStatus } from "../api/users";
import { toastError } from "../api/utils";
import { UserStatus } from "../constants";
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

const getStatusVariant = (status) => {
  const statusVariant =
    status === UserStatus.Active
      ? "text-success"
      : status === UserStatus.Banned
      ? "text-danger"
      : "text-warning";
  return statusVariant;
};

export const UsersTable = (props) => {
  const { search } = props;
  const [page, setPage] = useState(1);

  const { data } = useQuery(["users", page, search], () =>
    getUsers({ page, search })
  );

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation("update-status", updateUserStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
    onError: (err) => {
      toastError(err);
    },
  });

  const handleUpdateStatus = (userId, status) => {
    mutateAsync({ userId, status });
  };

  if (!data || data?.items.length === 0) {
    return <div className="text-center">No results found.</div>;
  }

  const { items, meta } = data;

  const TableRow = (props) => {
    const { name, email, studentId, isRegisteredWithGoogle, status, id } =
      props;

    const statusVariant = getStatusVariant(status);
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
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              {status !== UserStatus.Banned ? (
                <Dropdown.Item
                  onClick={() => handleUpdateStatus(id, UserStatus.Banned)}
                >
                  <FontAwesomeIcon
                    icon={faUserLock}
                    className="me-2 text-danger"
                  />{" "}
                  Ban Account
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  onClick={() => handleUpdateStatus(id, UserStatus.Active)}
                >
                  <FontAwesomeIcon
                    icon={faLockOpen}
                    className="me-2 text-success"
                  />{" "}
                  Unban Account
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
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

    const statusVariant = getStatusVariant(status);

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
