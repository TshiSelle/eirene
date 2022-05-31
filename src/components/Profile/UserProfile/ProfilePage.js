import React, { useState, useEffect, useCallback } from "react";
import { useAuthenticator } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import { GetUserInfo, GetUserPicture, ReactivateAccount, UploadProfilePicture, ChangeName } from "../../../api/ApiClient";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { Alert, Button } from "react-bootstrap";
import DeactivationModal from "./DeactivationModal";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import styled from "styled-components";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const { loggedIn, authToken } = useAuthenticator();
  const [imageSrc, setImageSrc] = useState(undefined);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userDeactivationDate, setDeactivationDate] = useState(false);
  const [message, setMessage] = useState("");
  const [fileSelected, setFileSelected] = useState("");

  useEffect(() => {
    if (loggedIn) {
      GetUserInfo(authToken)
        .then((response) => {
          setUser(response.data.dbUser);
          setFirstName(response.data.dbUser.fname);
          setLastName(response.data.dbUser.lname);
          setDeactivationDate(typeof response.data.dbUser.deactivationDate == "string");
        })
        .catch((error) => console.log(error.response.data.message));
    }
  }, [loggedIn, authToken]);

  const handleAccountStatus = useCallback(() => {
    if (userDeactivationDate) {
      setLoading(true);
      ReactivateAccount(authToken).then((response) => {
        if (response.data.success) {
          setDeactivationDate(false);
          setLoading(false);
          setMessage("Account Reactivation Successful");
          return response.data.message;
        } else {
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
          setFileSelected("");
        } else {
          setImageSrc(undefined);
          setFileSelected("");
        }
        setLoading(false);
      })
      .catch((error) => {
        setImageSrc(undefined);
        setLoading(false);
        setFileSelected("");
        return;
      });
  }, [loggedIn, authToken, setImageSrc]);

  const handleNameChange = () => {
    ChangeName(firstName, lastName, authToken).then((response) => {
      if (response.data.success) {
		  setUser({...user, fname: firstName, lname: lastName})
        setIsEdit(false);
      }
    });
  };
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

  function cancelEdit() {
    setFirstName(user?.fname);
    setLastName(user?.lname);
    setIsEdit(false);
  }

  return (
    <>
      {loggedIn ? (
        <PageContainer>
          <PageBanner>
            <BannerHeader>Profile</BannerHeader>
            <BannerPara>
              View your account details including profile picture, username, name, gender, email, and whether your account has been verified
              or not.
            </BannerPara>
          </PageBanner>

          <UserCard>
            <form className="profile-pic-form">
              <div className="form-group">
                <label htmlFor="upload-photo" className="label-upload">
                  Choose File
                </label>
                <input
                  type="file"
                  accepts="image/*"
                  id="upload-photo"
                  onChange={(e) => setFileSelected(e.target.value.split("\\")[e.target.value.split("\\").length - 1])}
                />
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
              {fileSelected && (
                <button type="button" className="btn submit-pic-button" onClick={handleImageUpload}>
                  Upload Picture ({fileSelected})
                </button>
              )}
            </form>

            <UserUsername>{user?.username}</UserUsername>
            {isEdit ? (
              <div className="change-name-grid">
                <textarea
                  onChange={(e) => setFirstName(e.target.value)}
                  className="name-change-textarea"
                  rows={1}
                  placeholder="First Name"
                  defaultValue={firstName}
                ></textarea>
                <textarea
                  onChange={(e) => setLastName(e.target.value)}
                  className="name-change-textarea"
                  rows={1}
                  placeholder="Last Name"
                  defaultValue={lastName}
                ></textarea>

                <Button
                  onClick={() => cancelEdit()}
                  style={{
                    color: "#212529",
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleNameChange}
                  style={{
                    color: "#212529",
                    fontWeight: "bold",
                  }}
                >
                  Submit
                </Button>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <UserPara>
                  {firstName} {lastName}
                </UserPara>

                <Button onClick={() => setIsEdit(true)} style={{ color: "#212529", fontWeight: "bold" }}>
                  Edit Name
                </Button>
              </div>
            )}

            <UserPara>{user?.gender}</UserPara>
            <UserPara>{user?.email}</UserPara>
            <UserPara>{user?.verified ? "Verified Account" : "Unverified Account"}</UserPara>
          </UserCard>

          <Button variant={userDeactivationDate ? "success" : "danger"} onClick={handleAccountStatus} className="deactivate-acc-button">
            {userDeactivationDate ? "Activate Account" : "Deactivate Account"}
          </Button>
          {message && (
            <div style={{ paddingTop: 20 }}>
              <Alert variant={userDeactivationDate ? "danger" : "success"}>{message}</Alert>
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
