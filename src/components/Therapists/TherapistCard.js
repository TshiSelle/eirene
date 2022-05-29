import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

const TherapistCard = ({ therapist }) => {
  let imageSource =
    therapist.gender === "male" ? "therapists/male/" : "therapists/female/";
  imageSource += therapist.profilePic;
  return (
    <Card>
      <CardImage publicId={imageSource}>
        <Transformation fetchFormat="auto" />
      </CardImage>

      <CardDetails>
        <Link to={`/therapist-description/${therapist._id}`}>
          <CardTitle>
            {therapist.fname} {therapist.lname}
          </CardTitle>
        </Link>

        <CardProfession>{therapist.title}</CardProfession>
        {/* <CardText>{therapist.description}</CardText> */}
        <CardText>
          <strong>E:</strong> {therapist.email}
        </CardText>
        <CardText>
          <strong>P:</strong> {therapist.phone}
        </CardText>

        <Link
          to={`/therapist-description/${therapist._id}`}
          className="link-button"
        >
          <GotoProfileButton>Profile</GotoProfileButton>
        </Link>
      </CardDetails>
    </Card>
  );
};

export default TherapistCard;

const GotoProfileButton = styled.button`
  border: none;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  width: 75px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const Card = styled.div``;

const CardImage = styled(Image)``;

const CardDetails = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h1`
  font-size: 26px;
  font-weight: bold;
`;

const CardProfession = styled.h1`
  font-size: 20px;
`;

const CardText = styled.div``;
