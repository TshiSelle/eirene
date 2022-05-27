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
        <CardTitle>
          {therapist.fname} {therapist.lname}
        </CardTitle>
        <CardProfession>{therapist.title}</CardProfession>
        {/* <CardText>{therapist.description}</CardText> */}
        <CardText>
          E: {therapist.email}
        </CardText>
        <CardText>
          P: {therapist.phone}
        </CardText>

        <Link to={`/therapist-description/${therapist._id}`}>
          <GotoProfileButton>Go to profile</GotoProfileButton>
        </Link>
      </CardDetails>
    </Card>
  );
};

export default TherapistCard;

const GotoProfileButton = styled.button`
margin-top:5%;
background-color: #FFFAFA;
  border: 0;
  border-radius: .5rem;
  box-sizing: border-box;
  color: #111827;
  font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: .875rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: .75rem 1rem;
  text-align: center;
  text-decoration: none #D1D5DB solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

&:hover {
  background-color: rgb(249,250,251);
}

&:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

&:focus-visible {
  box-shadow: none;
}
`;

const Card = styled.div`

  display: flex;
  gap: 20px;
  max-height: 250px;
  font-family: ProximaNova;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
`;

const CardImage = styled(Image)`
 
  height: 100%;
  width: 50%;
  position: center;
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
