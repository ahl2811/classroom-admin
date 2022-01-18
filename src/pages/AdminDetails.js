import { Col, Row } from "@themesberg/react-bootstrap";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../api/users";
import { AdminForm } from "../components/Forms";
import { ProfileCardWidget } from "../components/Widgets";
import NotFound from "./commons/NotFound";

export const AdminDetailsPage = () => {
  const { id: userId } = useParams();
  const { data: user, error } = useQuery(["admin", userId], () =>
    getUser(userId)
  );

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <AdminForm name={user?.name} email={user?.email} />
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget
                name={user?.name}
                email={user?.email}
                status={user?.status}
              />
            </Col>
            <Col xs={12}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
