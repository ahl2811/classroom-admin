import { Button, Card, Col, Form, Row } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { updateStudentId } from "../api/users";
import { toastError } from "../api/utils";

export const ClassroomForm = (props) => {
  const { name, code, description, section } = props;
  return (
    <Card border="light" className="bg-white shadow-sm mb-4 py-4">
      <Card.Body>
        <h5 className="mb-4">Classroom Information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Class Name</Form.Label>
                <Form.Control value={name} disabled={true} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Code</Form.Label>
                <Form.Control value={code} disabled={true} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Description</Form.Label>
                <Form.Control value={description} disabled={true} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Section</Form.Label>
                <Form.Control value={section} disabled={true} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const AdminForm = (props) => {
  const { name, email } = props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 py-4">
      <Card.Body>
        <h5 className="mb-4">Admin Information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                  value={name}
                  disabled={true}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Also your last name"
                  value={email}
                  disabled={true}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control required disabled={true} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+12-345 678 910"
                  disabled={true}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const UserForm = (props) => {
  const { name, email, studentId, userId } = props;
  const [stId, setStId] = useState("");

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation("update-studentId", updateStudentId, {
    onSuccess: () => {
      toast.success("Update student ID successfully.");
      queryClient.invalidateQueries(["user", userId]);
    },
    onError: (err) => {
      toastError(err);
    },
  });

  useEffect(() => {
    setStId(studentId);
  }, [studentId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (stId === studentId) return;
    mutateAsync({ userId, studentId: stId });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 py-4">
      <Card.Body>
        <h5 className="mb-4">User Information</h5>
        <Form onSubmit={(e) => handleUpdate(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  disabled={true}
                  type="text"
                  placeholder="Enter your first name"
                  value={name}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  disabled={true}
                  required
                  type="text"
                  placeholder="Also your last name"
                  value={email}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control required disabled={true} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  placeholder="Input student ID"
                  defaultValue={studentId}
                  value={stId}
                  onChange={(e) => setStId(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Save All
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
