import React, { useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";
import styled from "styled-components";
import ContactUs from "../ContactUs/ContactUsRoute.js";

const AboutUs = () => {
  return (
    <Main>
      <BgContainer>
        <AboutUsContainer>
          <AboutUsImage publicId={"logo/logo512_krj93a.svg"} alt="eirene_logo">
            <Transformation fetchFormat="auto" />
          </AboutUsImage>

          <AboutUsHeader>About Us</AboutUsHeader>

          <AboutUsText>
            Eirene is a self-care therapy application designed to create a
            connection to mental health professionals as well as encourage
            positive lifestyle practices. <br />
            <br />
            Included in Eirene are a chat room to send messages to therapists,
            journal feature to help you track your mood, a wide range of
            meditations, and a soothing radio for enhanced sleep quality. Our
            most prominent feature will be Eirene herself, a machine learning
            chatbot that understands the user's emotions and suggests coping
            mechanisms.
            <br />
            <br />
            Eirene aims to lend a helping hand to anyone who requires
            therapeutic insight, by aiding in different areas such as coping
            with stress, fueling career success, achieving mindfulness through
            meditation, conquering negative thoughts, and building
            self-confidence. Furthermore, the tools in Eirene are also useful
            for people who do not require formal mental health therapy but would
            like to practice self-care. This aid will be provided mainly through
            the convenience of a website with its responsive mobile application.
          </AboutUsText>
        </AboutUsContainer>
      </BgContainer>

      <div className="home-contact">
        <ContactUs />
      </div>
    </Main>
  );
};

export default AboutUs;

const Main = styled.main`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;

  @media (max-width: 991px) {
  }
`;

const AboutUsContainer = styled.section`
  background-color: #ffffff;
  text-align: center;
  width: 820px;
  padding: 30px;

  @media (max-width: 991px) {
    margin-top: 100px;
    width: unset;
  }
`;

const AboutUsImage = styled(Image)`
  width: 125px;
  height: 125px;
  margin-top: -65px;
  border-radius: 50%;

  @media (max-width: 991px) {
  }
`;
const BgContainer = styled.section`
  background-image: url("https://res.cloudinary.com/cloudloom/image/upload/f_auto/v1653829090/samples/Profile/about%20us%20compressed.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;

  @media (max-width: 991px) {
    background-position: bottom;
    height: unset;
  }

  @media (max-width: 780px) {
    background-position-y: 110px;
  }
`;

const AboutUsHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const AboutUsText = styled.p`
  @media (max-width: 991px) {
  }
`;
