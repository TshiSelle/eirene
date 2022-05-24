import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./HomePage.css";
import { Image, Transformation } from "cloudinary-react";

import ContactUs from "../ContactUs/ContactUsRoute.js";

const HomePage = () => {
  return (
    <Container>
      <GreenBackground></GreenBackground>

      <Main>
        <BannerSection>
          <BnHeader>Project: Eirene</BnHeader>
          <BnDescription>Embrace Your Inner Peace</BnDescription>
        </BannerSection>

        <TherapistSection>
          <ThImage publicId={"samples/Profile/home-img1.jpg"}>
            <Transformation fetchFormat="auto" />
          </ThImage>

          <ThDetails>
            <ThHeader>Find The Therapist For You</ThHeader>

            <div>
              <ThPara>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                totam, suscipit ipsa ipsum impedit, libero harum autem qui optio
                neque veniam. Magnam accusantium accusamus laudantium magni
                ipsum enim assumenda ipsam!
              </ThPara>
              <ThPara>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                totam, suscipit ipsa ipsum impedit, libero harum autem qui optio
                neque veniam. Magnam accusantium accusamus laudantium magni
                ipsum enim assumenda ipsam!
              </ThPara>
              <ThPara>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                totam, suscipit ipsa ipsum impedit, libero harum autem qui optio
                neque veniam. Magnam accusantium accusamus laudantium magni
                ipsum enim assumenda ipsam!
              </ThPara>
            </div>
          </ThDetails>
        </TherapistSection>

        <JournalSection>
          <JrHeader>Why Journaling?</JrHeader>
          <JrPara>It can help with</JrPara>

          <JrImage publicId={"samples/Profile/arrow.png"}>
            <Transformation fetchFormat="auto" />
          </JrImage>
          <JrSection>
            <JrDetails className="journal-reason">
              <div className="tell-me-why">
                <div className="point1 reasons">
                  <h5>Point 1</h5>
                  <p>
                    According to all know laws of aviation, there is no way a
                    bee should be able to fly.
                  </p>
                </div>

                <div className="point2 reasons">
                  <h5>Point 2</h5>
                  <p>
                    According to all know laws of aviation, there is no way a
                    bee should be able to fly.
                  </p>
                </div>
                <div className="point3 reasons">
                  <h5>Point 3</h5>
                  <p>
                    According to all know laws of aviation, there is no way a
                    bee should be able to fly.
                  </p>
                </div>
              </div>

              <div className="tell-me-why2">
                <div className="point4 reasons">
                  <h5>Point 4</h5>
                  <p>
                    According to all know laws of aviation, there is no way a
                    bee should be able to fly.
                  </p>
                </div>
                <div className="point5 reasons">
                  <h5>Point 5</h5>
                  <p>
                    According to all know laws of aviation, there is no way a
                    bee should be able to fly.
                  </p>
                </div>

                <div className="point6 reasons">
                  <h5>Go to page</h5>
                  <p>
                    <Link to={"/Journal"}>Journal.</Link>
                  </p>
                  <p></p>
                </div>
              </div>
            </JrDetails>
          </JrSection>
        </JournalSection>

        <RadioSection>
          <RaHeader>Radio</RaHeader>
          <RaDescription className="radioDesc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis totam,
            suscipit ipsa ipsum impedit, libero harum autem qui optio neque
            veniam. Magnam accusantium accusamus laudantium magni ipsum enim
            assumenda ipsam!
          </RaDescription>
        </RadioSection>
      </Main>

      <MeditationSection>
        <MediHeader>Meditations</MediHeader>

        <MediFlex>
          <MediItem>
            <MediImage publicId={"samples/Profile/home-img3.jpg"}>
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName>5 minute meditation for anxiety</MediName>
          </MediItem>

          <MediItem>
            <MediImage publicId={"samples/Profile/home-img3.jpg"}>
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName>5 minute meditation for anxiety</MediName>
          </MediItem>

          <MediItem>
            <MediImage publicId={"samples/Profile/home-img3.jpg"}>
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName>5 minute meditation for anxiety</MediName>
          </MediItem>
        </MediFlex>
      </MeditationSection>

      <div className="home-contact">
        <ContactUs />
      </div>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  font-display: swap;
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
`;

const GreenBackground = styled.div`
  background-color: #e1ebd5;
  height: 1101px;
  width: 100%;
  position: absolute;
  z-index: -1;
  margin-top: 350px;

  @media (max-width: 991px) {
    margin-top: 100px;
    height: 500px;
  }
`;

const Main = styled.main`
  width: 90%;
  margin: 108px auto 0;
  display: grid;

  @media (max-width: 991px) {
    margin: 73px auto 0;
    width: 100%;
  }
`;

const BannerSection = styled.section`
  background-image: url("https://res.cloudinary.com/cloudloom/image/upload/f_auto/v1650234147/samples/Profile/home-banner.jpg");
  height: 600px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  display: grid;
  justify-content: center;
  text-align: center;
  color: #ffffff;

  @media (max-width: 991px) {
    height: 200px;
  }
`;

const BnHeader = styled.h1`
  font-size: 70px;
  font-weight: bold;
  align-self: end;

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const BnDescription = styled.p`
  font-size: 20px;

  @media (max-width: 991px) {
    font-size: 15px;
  }
`;

const TherapistSection = styled.section`
  display: flex;
  height: 738px;
  background-color: #ffffff;
  margin-top: 135px;

  @media (max-width: 991px) {
    display: block;
    margin-top: 25px;
    height: unset;
  }
`;

const ThImage = styled(Image)`
  width: 50%;
  object-fit: cover;

  @media (max-width: 991px) {
    width: 100%;
    height: 320px;
    // object-position: 0px -135px;
  }
`;

const ThDetails = styled.section`
  width: 50%;
  padding: 5% 7%;
  box-sizing: border-box;

  @media (max-width: 991px) {
    width: 100%;
    padding: 5% 7% 0;
  }
`;

const ThHeader = styled.h1`
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

const ThPara = styled.p`
  font-size: 16px;
  margin-top: 20px;
  text-align: justify;

  @media (max-width: 991px) {
    margin-top: 10px;
  }
`;

const JournalSection = styled.section`
  text-align: center;
  margin-top: 20px;

  @media (max-width: 991px) {
    background-image: url("https://res.cloudinary.com/cloudloom/image/upload/f_auto/v1650234147/samples/Profile/home-img2.jpg");
    background-size: cover;
    background-position-x: right;
  }
`;

const JrHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;

  @media (max-width: 991px) {
    font-size: 25px;
    margin-top: 25px;
  }
`;

const JrPara = styled.p`
  height: 30px;
  margin-top: 20px;

  @media (max-width: 991px) {
    margin-top: unset;
  }
`;

const JrImage = styled(Image)`
  height: 30px;
  margin-top: 20px;

  @media (max-width: 991px) {
    margin-top: unset;
  }
`;

const JrSection = styled.section`
  background-image: url("https://res.cloudinary.com/cloudloom/image/upload/f_auto/v1650234147/samples/Profile/home-img2.jpg");
  background-size: cover;
  height: 822px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  @media (max-width: 991px) {
    background-image: unset;
    height: unset;
  }
`;

const JrDetails = styled.section`
  background-color: #ffffff;
  min-height: 463px;
  width: 60%;

  @media (max-width: 1166px) {
    width: 70%;
    height: unset;
  }

  @media (max-width: 991px) {
    width: 80%;
    height: unset;
    margin-bottom: 20px;
  }
`;

const RadioSection = styled.section`
  margin-top: 100px;
  text-align: center;
  display: grid;
  justify-items: center;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const RaHeader = styled.h1`
  font-size: 30px;
  border-bottom: 1px solid #212529;
  padding-bottom: 10px;
  width: 60%;
  font-weight: bold;

  @media (max-width: 991px) {
    font-size: 25px;
    width: 65%;
  }
`;

const RaDescription = styled.p`
  font-size: 23px;
  margin-top: 50px;
  width: 40%;

  @media (max-width: 991px) {
    font-size: 16px;
    margin-top: 25px;
    width: 65%;
  }
`;

const MeditationSection = styled.section`
  background-color: #e1ebd5;
  display: grid;
  justify-items: center;
  margin-top: 150px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const MediHeader = styled.h1`
  font-size: 30px;
  margin-top: 75px;
  font-weight: bold;

  @media (max-width: 991px) {
    font-size: 25px;
    margin-top: 30px;
  }
`;

const MediFlex = styled.div`
  display: flex;
  margin: 75px 0 100px;
  gap: 30px;

  @media (max-width: 991px) {
    display: block;
    margin: 15px 0;
  }
`;

const MediItem = styled.div`
  width: 300px;
`;

const MediImage = styled(Image)`
  width: 100%;
`;

const MediName = styled.p`
  background-color: #ffffff;
  font-size: 21px;
  padding: 20px;
  font-family: ProximaNova;

  @media (max-width: 991px) {
    font-size: 16px;
  }
`;
