import React from "react";
import { Image, Transformation } from "cloudinary-react";
import styled from "styled-components";

const AboutUs = () => {
  return (
    <Main>
      <AboutUsContainer>
        <AboutUsImage
          publicId={"logo/eirene_face_00001_y23lbc.svg"}
          alt="eirene_logo"
        >
          <Transformation fetchFormat="auto" />
        </AboutUsImage>

        <AboutUsDetails>
          <AboutUsHeader>About Us</AboutUsHeader>

          <div>
            <AboutUsText>
              Thousands of Lebanese people use Eirene to find therapists and
              counselors, and mental health resources. If you or someone you
              know is experiencing mental health or behavioral concerns,
              relationship issues, or other challenges, search our directory to
              a find a qualified therapist near you. Everyone struggles at
              times. Our core purpose is to make it easier for people to access
              mental health services and the dedicated professionals who provide
              them, anywhere in the world. To help promote successful outcomes,
              we offer practitioners a variety of benefits: referrals,
              nationally recognized continuing education, publication
              opportunities, marketing expertise, data-driven performance
              tracking, personalized support, and more. List your practice and
              get found. Eirene believes that with the right support, anyone is
              capable of healing, growth, and change. Whether you’re interested
              in mental health services or you provide them, you’ve come to the
              right place.
            </AboutUsText>
          </div>
        </AboutUsDetails>
      </AboutUsContainer>
    </Main>
  );
};

export default AboutUs;

const Main = styled.main`
  width: 90%;
  margin: 70px auto 0;
  display: grid;

  @media (max-width: 991px) {
    margin: 73px auto 0;
    width: 100%;
  }
`;

const AboutUsContainer = styled.section`
  display: flex;
  height: 738px;
  background-color: #e1ebd5;
  margin-top: 135px;

  @media (max-width: 991px) {
    display: block;
    margin-top: 25px;
    height: unset;
  }
`;

const AboutUsImage = styled(Image)`
  width: 50%;
  object-fit: cover;

  @media (max-width: 991px) {
    width: 100%;
    height: 320px;
    // object-position: 0px -135px;
  }
`;
const AboutUsDetails = styled.section`
  width: 50%;
  padding: 5% 7%;
  box-sizing: border-box;

  @media (max-width: 991px) {
    width: 100%;
    padding: 5% 7% 0;
  }
`;

const AboutUsHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid #212529;
  padding-bottom: 40px;
  margin-bottom: 40px;

  @media (max-width: 991px) {
    font-size: 25px;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
`;
const AboutUsText = styled.p`
  font-size: 20px;
  margin-top: 20px;
  text-align: justify;

  @media (max-width: 991px) {
    margin-top: 10px;
  }
  @media (max-width: 1430px) {
    font-size: 85% !important;
  }
  @media (max-width: 1085px) {
    font-size: 80% !important;
  }
`;
