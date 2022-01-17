import { Button, Form, Modal } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useQueryClient, useMutation } from "react-query";
import { toastError } from "../api/utils";
import { toast } from "react-toastify";
import { addAdmin } from "../api/admins";
import { LoadingButton } from "./LoadingButton";

const addAdminSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email.")
    .required("Email is required."),

  name: yup.string().required("Name is required."),
});

export const ModalAddAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation("add-admin", addAdmin, {
    onSuccess: () => {
      toast.success("Add new admin successfully.");
      queryClient.invalidateQueries(["admins"]);
      setShowModal(false);
    },
    onError: (err) => {
      toastError(err);
    },
  });

  const handleAddReview = (data) => {
    mutateAsync(data);
  };

  return (
    <>
      <Button onClick={() => setShowModal(!showModal)}>
        <span className="text-nowrap">+ New</span>
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          <Formik
            validationSchema={addAdminSchema}
            onSubmit={handleAddReview}
            initialValues={{ email: "", name: "" }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit} id="reviewForm">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {touched.email && errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {touched.name && errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <LoadingButton isLoading={isLoading} type="submit" form="reviewForm">
            Submit
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
