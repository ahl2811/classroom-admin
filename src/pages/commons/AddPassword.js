import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Container, Form, Row } from "@themesberg/react-bootstrap";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { addPassword, validateToken } from "../../api/auth";
import { toastError } from "../../api/utils";
import { LoadingButton } from "../../components/LoadingButton";
import useUserContext from "../../hooks/useUserContext";
import NotFound from "../../pages/commons/NotFound";
import { Routes } from "../../routes";

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const AddPasswordPage = () => {
  const { user } = useUserContext();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: Routes.Admins.path } };

  const { search } = useLocation();
  const params = search.split("=");
  const token = params[1];

  if (user) {
    history.replace(from);
  }

  const { error: validateTokenError } = useQuery("token-validation", () =>
    validateToken(encodeURIComponent(token))
  );

  const {
    isLoading: isAddNewPasswordLoading,
    mutateAsync: addnewPasswordAsync,
  } = useMutation("add-password", addPassword, {
    onSuccess: () => {
      toast.success("Add new password successfully. Now you can login.", {
        position: "top-center",
      });
      history.push("/login");
    },
    onError: (err) => {
      toastError(err);
    },
  });

  const handleAddNewPassword = (data) => {
    addnewPasswordAsync({ password: data.password, token });
  };

  if (validateTokenError) {
    return <NotFound />;
  }

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                className="text-gray-700"
              >
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
                sign in
              </Card.Link>
            </p>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Add password</h3>
                <Formik
                  validationSchema={passwordSchema}
                  onSubmit={handleAddNewPassword}
                  initialValues={{
                    password: "",
                    confirmPassword: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                  }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && !!errors.password}
                            isValid={touched.password && !errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={
                              touched.confirmPassword &&
                              !!errors.confirmPassword
                            }
                            isValid={
                              touched.confirmPassword && !errors.confirmPassword
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                          <LoadingButton
                            variant="primary"
                            type="submit"
                            isLoading={isAddNewPasswordLoading}
                            className="w-100 mt-3 mb-2 classroom-btn"
                          >
                            Submit
                          </LoadingButton>
                        </Form.Group>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
