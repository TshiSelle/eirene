import { Image, Transformation } from "cloudinary-react";
import React, { useState } from "react";
import styled from "styled-components";
import { GetUserInfo } from "../../api/ApiClient";
import { useAuthenticator } from "../../context/AuthContext";
import ContactUs from "../ContactUs/ContactUsRoute.js";
import VerificationPopUp from "../Profile/SignUp/VerificationPopUp/VerificationPopUp";
import "./HomePage.css";

const HomePage = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { loggedIn, authToken } = useAuthenticator();
  if (loggedIn) {
    GetUserInfo(authToken)
      .then((response) => {
        const user = response.data.dbUser;
        if (
          response.data.success &&
          !user.verified &&
          Date.now() - Date.parse(user.createdAt) < 20000
        ) {
          setShowPopUp(true);
        }
      })
      .catch((error) => console.log(error.response.data.message));
    // if user unverified and newly created show verification popup
  }

  return (
    <Container>
      <GreenBackground></GreenBackground>

      {showPopUp && <VerificationPopUp />}
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
                Many people seek treatment from a therapist because they are
                dealing with a personal dispute, relationship or family
                problems, or a mental health condition such as depression,
                stress, or anxiety. A therapist or psychologist is a
                professional who has been trained to assist in the treatment of
                mental or physical health issues.
              </ThPara>
              <ThPara>
                Finding the right therapist may be a time-consuming and
                challenging process, and some people may be unsure where to
                begin. It's not always easy to figure out what kind of therapist
                is ideal for a given problem, and a therapist's ethics or
                credentials are frequently a factor to consider.
              </ThPara>
              <ThPara>
                Our directory is one of the safest sites to find a therapist
                online because Eirene maintains high member criteria. All
                therapists listed in our directory must have a graduate degree
                and agree to follow the components of good therapy. They must
                also have a professional license or reside in a state in which
                it is permissibile to practice without one or as an intern under
                supervision.
              </ThPara>
              <ThPara>
                Finally, if you have any hesitations, you can always text
                Eirene, your close friend. Because, in the end, she will always
                be there for you, no matter what.
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
                  <h5>Self-Discovery</h5>
                  <p>
                    We are constantly evolving. Journaling helps us to listen,
                    bear witness to these changes, and simply get to know
                    ourselves a whole lot better.
                  </p>
                </div>

                <div className="point2 reasons">
                  <h5>Sharpening Memory</h5>
                  <p>
                    Journaling boosts comprehension and increases working memory
                    capacity.
                  </p>
                </div>
                <div className="point3 reasons">
                  <h5>Reducing Anxiety</h5>
                  <p>
                    Journaling can be a powerful tool for examining and shifting
                    thoughts from anxious and ruminative to empowered and
                    action-oriented.
                  </p>
                </div>
              </div>

              <div className="tell-me-why2">
                <div className="point4 reasons">
                  <h5>Processing Emotions</h5>
                  <p>
                    Journaling gives you the opportunity to process your
                    emotions in a safe, contained space where difficult emotions
                    become less overwhelming and easier to manage.
                  </p>
                </div>
                <div className="point5 reasons">
                  <h5>Reducing Stress</h5>
                  <p>
                    Journaling is a good-for-you habit that the lessens impact
                    of physical stressors on your health.
                  </p>
                </div>

                <div className="point6 reasons">
                  <h5>Boosting Mood</h5>
                  <p>
                    Journaling can improve your mood and give you a greater
                    sense of overall emotional well-being and happiness.
                  </p>
                </div>
              </div>
            </JrDetails>
          </JrSection>
        </JournalSection>

        <RadioSection>
          <RaHeader>Radio</RaHeader>
          <RaDescription className="radioDesc">
            Music can help with stress management and mood modulation. The best
            feature is that it is always there for anyone who needs it. Whether
            you're on the edge or need a slight lift, one song can send you back
            to a more even and healthy place. When it comes to your mental
            health, music can help you sleep better, raise your mood, and reduce
            stress.
          </RaDescription>
        </RadioSection>
      </Main>

      <MeditationSection>
        <MediHeader>Meditations</MediHeader>
        <MediPara>
          Meditation is the practice of focused concentration and bringing
          yourself back to the moment over and over again. <br />
          Here are some meditations found in Eirene.
        </MediPara>

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
        <MediPara>Meditations can be found in the media player</MediPara>
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
  margin: 0 auto;
  display: grid;

  @media (max-width: 991px) {
    margin: 0 auto;
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
  text-align: center;

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

const MediPara = styled.p`
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
  padding: 0 10px;

  @media (max-width: 991px) {
    margin-top: 10px;
  }
`;

const MediFlex = styled.div`
  display: flex;
  margin: 75px 0 70px;
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
