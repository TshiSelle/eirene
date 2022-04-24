import React, { useState } from "react";
// import { GetUserAppointments } from "../../../api/ApiClient";
import { useAuthenticator } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
// import { useUserCalendar } from "../../../context/CalendarContext";
import { Link } from "react-router-dom";
import Calendar from "react-awesome-calendar";

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
  // const { userCalendarAppointments } = useUserCalendar();
  const { loggedIn } = useAuthenticator();

  const handleImageUpload = () => {
    const imageFile = document.querySelector('input[type="file"]');
    // destructure the files array from the resulting object
    const files = imageFile.files;
    console.log(files);
    if (!files.length) return;
    // we retrieved the files of the image, now we turn it into a URL so it can be processed as an image...
    setImageSrc(URL.createObjectURL(files[0]));
  };

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
                <img
                  src={imageSrc}
                  alt="user image"
                  style={{ width: 100, height: 100 }}
                />
              )}
              <button type="button" className="btn" onClick={handleImageUpload}>
                Submit
              </button>
            </form>
          </section>
          <div>
            <Calendar
              events={events}
              onClickTimeLine={() => console.log(" clicked timeLine")}
            />
          </div>
          <button onClick={userLogOut}>LOG OUt!</button>
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
    </>
  );
};

export default ProfilePage;
