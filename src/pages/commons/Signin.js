import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormCheck,
  InputGroup,
  Row,
} from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { useMutation } from "react-query";
import { login } from "../../api/auth";
import useUserContext from "../../hooks/useUserContext";
import { LoginSuccess } from "../../store/actions";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toastError } from "../../api/utils";
import { Routes } from "../../routes";
import { toast } from "react-toastify";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch, user } = useUserContext();

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: Routes.Admins.path } };

  if (user) {
    history.replace(from);
  }

  const { mutateAsync, isLoading } = useMutation("login", login, {
    onSuccess: (response) => {
      const { user: userRes, accessToken } = response;
      if (userRes.role !== "admin") {
        toast.error("Please check your credentials.", {
          position: "top-center",
        });
        return;
      }
      const userInfo = {
        ...userRes,
        avatar: `https://ui-avatars.com/api/?name=${userRes.name}&background=0D8ABC&color=fff`,
        accessToken,
      };
      dispatch(LoginSuccess(userInfo));
    },
    onError: (err) => {
      toastError(err);
    },
  });

  const handleLogin = () => {
    mutateAsync({ email, password });
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to classrooms</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          type="password"
                          placeholder="Password"
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          Remember me
                        </FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end"></Card.Link>
                    </div>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    Sign in
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link className="fw-bold">
                      {` Contact Admin `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
