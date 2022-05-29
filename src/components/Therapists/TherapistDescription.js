import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./TherapistSearch.css";
import { GetFilteredTherapist } from "../../api/ApiClient";
import { useAuthenticator } from "../../context/AuthContext";
import styled from "styled-components";
import { Image, Transformation } from "cloudinary-react";

const TherapistDescription = () => {
  const { loggedIn, authToken } = useAuthenticator();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  let imageSource =
    data.gender === "male" ? "therapists/male/" : "therapists/female/";
  imageSource += data.profilePic;
  //   console.log(loggedIn, ' and token: ', authToken);
  useEffect(() => {
    GetFilteredTherapist(id)
      .then((response) => {
        if (response.data.success) {
          setData(response.data.dbTherapist);
          setError("");
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        return;
      });
  }, [id]);

  useEffect(() => {
	window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <MainGrid>
        <LeftThProfile>
          <ThProfilePic publicId={imageSource}>
            <Transformation fetchFormat="auto" />
          </ThProfilePic>
          <ThDescPara style={{ fontWeight: "bold" }} className="hide-mobile">
            {data.fname} {data.lname}
          </ThDescPara>
          <ThDescPara className="hide-mobile">{data.title}</ThDescPara>
        </LeftThProfile>

        <RightThProfile>
          <ThDescHeader>
            {data.fname} {data.lname}
          </ThDescHeader>
          <ThDescPara
            style={{
              borderBottom: "1px solid #212529",
              paddingBottom: "20px",
              marginBottom: "20px",
            }}
          >
            {data.description}
          </ThDescPara>

          <ThDescSub>Personal Details</ThDescSub>
          <ThDescGrid
            style={{
              borderBottom: "1px solid #212529",
              paddingBottom: "20px",
              marginBottom: "20px",
            }}
          >
            <ThDescPara>
              Name <br />
              {data.fname} {data.lname}
            </ThDescPara>
            <ThDescPara>
              Gender <br />
              {data.gender}
            </ThDescPara>
            <ThDescPara>
              Email <br />
              {data.email}
            </ThDescPara>
            <ThDescPara>
              Phone Number <br />
              {data.phone}
            </ThDescPara>
          </ThDescGrid>

          <ThDescSub>Professional Details</ThDescSub>
          <ThDescGrid>
            <ThDescPara>
              Profession <br />
              {data.title}
            </ThDescPara>
            <ThDescPara>
              Office Address <br />
              {data.officeAddress}
            </ThDescPara>
            <ThDescPara>
              University <br />
              {data.university}
            </ThDescPara>
            <ThDescPara>
              Degree <br />
              {data.degree}
            </ThDescPara>
            <ThDescPara>
              Years of Experience <br />
              {data.yearsOfExperience}
            </ThDescPara>
          </ThDescGrid>
        </RightThProfile>
      </MainGrid>

      {/* <h4>{data.fname}'s schedule:</h4>
      {error && (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )} */}
    </>
  );
};

export default TherapistDescription;

const MainGrid = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  display: flex;
  justify-content: center;
  gap: 35px;
  padding-bottom: 40px;

  @media (max-width: 991px) {
    display: block;
    padding-bottom: unset;
  }
`;

const LeftThProfile = styled.div`
  background-color: #e1ebd5;
  width: 250px;
  height: 250px;
  display: grid;
  align-content: center;
  justify-items: center;
  margin-top: 40px;

  @media (max-width: 991px) {
    width: 100%;
    height: 108px;
    background-color: #5e6e4b;
    margin-top: 0;
  }
`;

const RightThProfile = styled.div`
  background-color: #e1ebd5;
  padding: 30px;
  width: 660px;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ThProfilePic = styled(Image)`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;

  @media (max-width: 991px) {
    margin: 80px 0 0;
    border: 1px solid #e1ebd5;
  }
`;

const ThDescPara = styled.p`
  margin: unset;

  @media (max-width: 991px) {
  }
`;

const ThDescHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 7px;

  @media (max-width: 991px) {
    padding-top: 50px;
  }
`;

const ThDescSub = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;

  @media (max-width: 991px) {
  }
`;

const ThDescGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;
