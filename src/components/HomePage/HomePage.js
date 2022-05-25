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
          <ThImage publicId={"samples/Profile/home-img1.jpg"} alt="hand">
            <Transformation fetchFormat="auto" />
          </ThImage>

          <ThDetails>
            <ThHeader>Find The Therapist For You</ThHeader>

            <div>
              <ThPara>
                When faced with a personal conflict, relationship or family
                troubles, or a mental health condition such as depression,
                stress, or anxiety, many people turn to a therapist for help. A
                therapist is a person who has received training to help treat
                mental or physical health problems. In the context of
                psychology, a therapist is a person who is trained and licensed
                to practice psychotherapy.
              </ThPara>
              <ThPara>
                Finding the right therapist can often be a lengthy and
                challenging process, and some people may not know where to
                begin. Determining what kind of therapist is best suited to
                treat a particular issue may not be the easiest task, and a
                therapist's ethics or credentials are also often a topic of
                consideration. It may also be impractical, impossible, or even
                dangerous for some individuals to spend any length of time on
                the telephone, contacting potential therapists and describing
                the issues they would like to explore in therapy.
              </ThPara>
              <ThPara>
                Because Eirene has high member standards, our directory is one
                of the safest places to find a therapist online. We require all
                therapists who list in our directory to have a graduate-level
                education and to agree to the elements of healthy therapy. They
                must also have a professional license or reside in a
                jurisdiction in which it is legal to practice without a license
                or as an intern under supervision.
              </ThPara>
              <ThPara>
                Finally, if you ever hesitate. You can always text your close
                friend, Eirene. Because in the end, no matter what, she will
                always be there for you.
              </ThPara>
            </div>
          </ThDetails>
        </TherapistSection>

        <JournalSection>
          <JrHeader>Why Journaling?</JrHeader>
          <JrPara>It can help with</JrPara>

          <JrImage publicId={"samples/Profile/arrow.png"} alt="arrow">
            <Transformation fetchFormat="auto" />
          </JrImage>
          <JrSection>
            <JrDetails className="journal-reason">
              <div className="tell-me-why">
                <div className="point1 reasons">
                  <h5>Self-talk</h5>
                  <p>
                    It provides an opportunity for positive self-talk and
                    identifying negative thoughts and behaviors
                  </p>
                </div>

                <div className="point2 reasons">
                  <h5>Fears and Concerns</h5>
                  <p>It helps you prioritize problems, fears, and concerns.</p>
                </div>
                <div className="point3 reasons">
                  <h5>Anxiety</h5>
                  <p>It helps you to manage your anxiety.</p>
                </div>
              </div>

              <div className="tell-me-why2">
                <div className="point4 reasons">
                  <h5>Triggers</h5>
                  <p>
                    Tt helps tracking any symptoms day-to-day so that you can
                    recognize triggers and learn ways to better control them
                  </p>
                </div>
                <div className="point5 reasons">
                  <h5>Stress</h5>
                  <p>It helps you cope with stress.</p>
                </div>

                <div className="point6 reasons">
                  <h5>Shall we begin?</h5>
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
            Music is a powerful tool for mood regulation and stress. The best
            part is, it’s always available to anyone who needs it. Whether
            you’re on edge or need a boost, even just one song can bring you
            back to a more even and healthy place. When it comes to your mental
            health, music can help you rest better, lift your mood, and reduce
            stress.
          </RaDescription>
        </RadioSection>
      </Main>

      <MeditationSection>
        <MediHeader>Meditations</MediHeader>

        <MediFlex>
          <MediItem>
            <MediImage
              publicId={"Meditations/meditation_lezixo.jpg"}
              alt="meditation"
            >
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName>10 minute meditation for anxiety</MediName>
          </MediItem>

          <MediItem>
            <MediImage
              publicId={"Meditations/10_min_meditation_for_sleep_a45ext.jpg"}
              alt="meditation1"
            >
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName>10 minute meditation for sleep</MediName>
          </MediItem>

          <MediItem>
            <MediImage
              publicId={"Meditations/10_min_meditation_stress_iwvnuo.jpg"}
              alt="meditation2"
            >
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName>10 minute meditation for stress</MediName>
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
  @media (max-width: 1430px) {
    font-size: 85% !important;
  }
  @media (max-width: 1085px) {
    font-size: 80% !important;
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
