import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TherapistCard = ({ therapist }) => {
  return (
    <Card>
      <CardImage src={require("./background.jpg")} />

      <CardDetails>
        <CardTitle>
          {therapist.fname} {therapist.lname}
        </CardTitle>
        <CardProfession>{therapist.title}</CardProfession>
        <CardText>{therapist.description}</CardText>
        <CardText>
          E: {therapist.email}
        </CardText>
        <CardText>
          P: {therapist.phone}
        </CardText>

        <Link to={`/therapist-description/${therapist._id}`}>
          Go To Profile
        </Link>
      </CardDetails>
    </Card>
  );
};

export default TherapistCard;

const Card = styled.div`
  display: flex;
  gap: 20px;
  height: 200px;
  font-family: ProximaNova;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
`;

const CardImage = styled.img`
  height: 100%;
`;

const CardDetails = styled.div``;

const CardTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const CardProfession = styled.h1`
  border-bottom: 1px solid rgb(0 0 0 / 10%);
  padding-bottom: 10px;
`;

const CardBody = styled.div``;

const CardText = styled.div``;

const ListGroup = styled.div``;

const ListGroupItem = styled.div``;
