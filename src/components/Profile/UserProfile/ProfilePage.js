import React, { useState, useEffect, useCallback } from "react";
import { useAuthenticator } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import {
  GetUserInfo,
  GetUserPicture,
  ReactivateAccount,
  UploadProfilePicture,
} from "../../../api/ApiClient";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { Alert, Button } from "react-bootstrap";
import DeactivationModal from "./DeactivationModal";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import styled from "styled-components";
import "./ProfilePage.css";
// import { GetUserAppointments } from "../../../api/ApiClient";
// import { useUserCalendar } from "../../../context/CalendarContext";
// import Calendar from "react-awesome-calendar";

const events = [
  {
    id: 1,
    color: "#fd3153",
    from: "2019-05-02T18:00:00+00:00",
    to: "2019-05-05T19:00:00+00:00",
    title: "This is an event",
  },
  {
    id: 2,
    color: "#1ccb9e",
    from: "2022-05-05T13:00:00+00:00",
    to: "2022-05-05T14:00:00+00:00",
    title: "This is another event",
  },
  {
    id: 3,
    color: "#3694DF",
    from: "2019-05-05T13:00:00+00:00",
    to: "2019-05-05T20:00:00+00:00",
    title: "This is also another event",
  },
];

const ProfilePage = () => {
  const { user, userLogOut } = useUser();
  const { loggedIn, authToken } = useAuthenticator();
  const [imageSrc, setImageSrc] = useState(undefined);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userDeactivationDate, setDeactivationDate] = useState(false);
  const [message, setMessage] = useState("");
  // const { userCalendarAppointments } = useUserCalendar();

  if (loggedIn) {
    GetUserInfo(authToken)
      .then((response) => {
        setDeactivationDate(
          typeof response.data.dbUser.deactivationDate == "string"
        );
      })
      .catch((error) => console.log(error.response.data.message));
  }

  const handleAccountStatus = useCallback(() => {
    if (userDeactivationDate) {
      setLoading(true);
      ReactivateAccount(authToken).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setDeactivationDate(false);
          setLoading(false);
          setMessage("Account Reactivation Successful");
          return response.data.message;
        } else {
          console.log(response.data);
          setLoading(false);
          return response.data.message;
        }
      });
    } else {
      setDeactivateModalOpen(true);
    }
  }, [userDeactivationDate]);

  const handleImageUpload = useCallback(() => {
    if (!loggedIn) return;
    const imageFile = document.querySelector('input[type="file"]');
    // destructure the files array from the resulting object
    const files = imageFile.files;
    if (!files.length) return;
    setLoading(true);
    UploadProfilePicture(files[0], authToken)
      .then((response) => {
        if (response.data.success) {
          setImageSrc(response.data.result.public_id);
        } else {
          setImageSrc(undefined);
        }
        setLoading(false);
      })
      .catch((error) => {
        setImageSrc(undefined);
        setLoading(false);
        return;
      });
  }, [loggedIn, authToken, setImageSrc]);

  useEffect(() => {
    if (!loggedIn) return;
    GetUserPicture(authToken)
      .then((response) => {
        if (response.data.success) {
          setImageSrc(response.data.image_url);
        } else {
          setImageSrc(undefined);
        }
      })
      .catch((error) => {
        setImageSrc(undefined);
        return;
      });
  }, [loggedIn, authToken, imageSrc]);


  useEffect(() => {
	window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {loggedIn ? (
        <PageContainer>
          <PageBanner>
            <BannerHeader>Profile</BannerHeader>
            <BannerPara>
              View your account details including profile picture, username,
              name, gender, email, and whether your account has been verified or
              not.
            </BannerPara>
          </PageBanner>

          <UserCard>
            <form className="profile-pic-form">
              <div className="form-group">
                <label for="upload-photo" class="label-upload">
                  Choose File
                </label>
                <input type="file" accepts="image/*" id="upload-photo" />
              </div>
              {imageSrc && (
                <Image
                  publicId={imageSrc}
                  alt="user image"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                >
                  <Transformation fetchFormat="auto" />
                </Image>
              )}
              <button
                type="button"
                className="btn submit-pic-button"
                onClick={handleImageUpload}
              >
                Upload Picture
              </button>
            </form>

            <UserUsername>{user?.username}</UserUsername>
            <UserPara>
              {user?.fname} {user?.lname}
            </UserPara>
            <UserPara>{user?.gender}</UserPara>
            <UserPara>{user?.email}</UserPara>
            <UserPara>
              {user?.verified ? "Verified Account" : "Unverified Account"}
            </UserPara>
          </UserCard>

          <Button
            variant={userDeactivationDate ? "success" : "danger"}
            onClick={handleAccountStatus}
            className="deactivate-acc-button"
          >
            {userDeactivationDate ? "Activate Account" : "Deactivate Account"}
          </Button>
          {message && (
            <div style={{ paddingTop: 20 }}>
              <Alert variant={userDeactivationDate ? "danger" : "success"}>
                {message}
              </Alert>
            </div>
          )}
        </PageContainer>
      ) : (
        <LoggedOutPage>
          <PageBanner>
            <BannerHeader>You Are Not Logged In</BannerHeader>
            <BannerPara>Please login to access your profile page.</BannerPara>
          </PageBanner>
          <ButtonHolder>
            <Link to="/SignIn">
              <SignInButton>Sign In</SignInButton>
            </Link>
            <Link to="/SignUp">
              <SignUpButton>Sign Up</SignUpButton>
            </Link>
          </ButtonHolder>
        </LoggedOutPage>
      )}
      <LoadingSpinner display={isLoading} />
      <DeactivationModal
        setDate={setDeactivationDate}
        setMessage={setMessage}
        showModal={deactivateModalOpen}
        closeModal={() => setDeactivateModalOpen(false)}
        authToken={authToken}
      />
    </>
  );
};

export default ProfilePage;

const PageContainer = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  display: grid;
`;

const PageBanner = styled.div`
  height: 200px;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;

  @media (max-width: 991px) {
    height: unset;
    padding: 20px;
  }
`;

const BannerHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const BannerPara = styled.p`
  max-width: 600px;
  margin-top: 10px;
`;

const UserCard = styled.div`
  background-color: #efd8db;
  padding: 45px;
  width: 404px;
  justify-self: center;
  display: grid;
  justify-items: center;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const UserUsername = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0 0;
`;

const UserPara = styled.p`
  margin: 5px 0 0;
`;

const LoggedOutPage = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  height: 65vh;
`;

const SignUpButton = styled.button`
  width: 404px;
  justify-self: center;
  border: 1px solid #edbec4;
  background-color: transparent;
  height: 54px;
  color: #212529;
  border-radius: 0.25rem;

  &:hover {
    background-color: #fbfbfb;
  }

  @media (max-width: 991px) {
    width: 350px;
  }
`;

const SignInButton = styled.button`
  width: 404px;
  justify-self: center;
  background-color: #edbec4;
  border: none;
  height: 54px;
  color: #ffffff;
  border-radius: 0.25rem;

  &:hover {
    background-color: #edafb6;
  }

  @media (max-width: 991px) {
    width: 350px;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (max-width: 991px) {
    display: grid;
  }
`;
