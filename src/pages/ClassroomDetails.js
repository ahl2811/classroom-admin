import { Col, Row } from "@themesberg/react-bootstrap";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getClassDetail } from "../api/classroom";
import { ClassroomForm } from "../components/Forms";
import { ProfileCardWidget } from "../components/Widgets";
import NotFound from "./commons/NotFound";

export const ClassroomDetailsPage = () => {
  const { id: roomId } = useParams();
  const { data: classDetails, error } = useQuery(["classroom", roomId], () =>
    getClassDetail(roomId)
  );

  if (error) {
    return <NotFound />;
  }

  console.log("class", classDetails);

  const classroom = classDetails?.classroom || {};
  const teachers = classDetails?.teachers || [];
  const owner = teachers[0] || {};

  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <ClassroomForm
            name={classroom?.name}
            code={classroom?.code}
            description={classroom?.description}
            section={classroom?.section}
          />
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget
                name={owner?.name}
                email={owner?.email}
                status={"Owner"}
              />
            </Col>
            <Col xs={12}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
