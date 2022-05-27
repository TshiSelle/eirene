import React, { useState, useEffect, useCallback } from "react";
// import { GetUserAppointments } from "../../../api/ApiClient";
import { useAuthenticator } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import { GetUserPicture, ReactivateAccount, UploadProfilePicture } from "../../../api/ApiClient";
// import { useUserCalendar } from "../../../context/CalendarContext";
import { Link } from "react-router-dom";
import Calendar from "react-awesome-calendar";
import { Image, Transformation } from "cloudinary-react";
import DeactivationModal from "./DeactivationModal";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

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
  const [imageSrc, setImageSrc] = useState(undefined);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const { loggedIn, authToken } = useAuthenticator();
  const [isLoading, setLoading] =useState(false);
  const userDeactivationDate = user?.deactivationDate == undefined ? undefined : user.deactivationDate;
  // const { userCalendarAppointments } = useUserCalendar();
  console.log(user);
  const handleAccountStatus = useCallback(() => {
    if (userDeactivationDate != undefined) {
      ReactivateAccount(authToken).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          return response.data.message;
        } else {
          console.log(response.data);
          return response.data.message;
        }
      });
    }else {
      setDeactivateModalOpen(true)
    }
    
  }, []);

  const handleImageUpload = useCallback(() => {
    if (!loggedIn) return;
    const imageFile = document.querySelector('input[type="file"]');
    // destructure the files array from the resulting object
    const files = imageFile.files;
    if (!files.length) return;
	setLoading(true)
    UploadProfilePicture(files[0], authToken)
      .then((response) => {
        if (response.data.success) {
          setImageSrc(response.data.result.public_id);
        } else {
          setImageSrc(undefined);
        }
		setLoading(false)
	})
	.catch((error) => {
		setImageSrc(undefined);
		setLoading(false)
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

  return (
    <>
      {loggedIn ? (
        <div>
          <h2>
            {user?.fname} {user?.lname}
          </h2>
          <h2>{user?.email}</h2>
          <section className="left-side">
            <form>
              <div className="form-group">
                <input type="file" accepts="image/*" />
              </div>
              {imageSrc && (
                <Image
                  publicId={imageSrc}
                  alt="user image"
                  style={{ width: 100, height: 100 }}
                >
					<Transformation fetchFormat="auto" />
				</Image>
              )}
			  <LoadingSpinner display={isLoading} />
              <button type="button" className="btn" onClick={handleImageUpload}>
                Submit
              </button>
            </form>
          </section>
          <button onClick={handleAccountStatus}>
            {userDeactivationDate && userDeactivationDate != undefined ? 'Activate Account': 'Deactivate Account'}
          </button>
          {/* <div>
            <Calendar
              events={events}
              onClickTimeLine={() => console.log(" clicked timeLine")}
            />
          </div> */}
        </div>
      ) : (
        <div>
          <h3>You are not logged in!</h3>
          <p> Please login to access profile.</p>
          <Link to="/SignUp">Go to Signup</Link>
          <h2>OR</h2>
          <Link to="/SignIn">Go to Login</Link>
        </div>
      )}
      <DeactivationModal
        showModal={deactivateModalOpen}
        closeModal={() => setDeactivateModalOpen(false)}
        authToken={authToken}
      />
    </>
  );
};

export default ProfilePage;
