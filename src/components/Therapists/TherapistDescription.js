import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./TherapistSearch.css";
import { GetFilteredTherapist, GetUserAppointments } from "../../api/ApiClient";
import { useAuthenticator } from "../../context/AuthContext";
import Calendar from 'react-awesome-calendar';

const events = [{
    id: 1,
    color: '#fd3153',
    from: '2019-05-02T18:00:00+00:00',
    to: '2019-05-05T19:00:00+00:00',
    title: 'This is an event'
}, {
    id: 2,
    color: '#1ccb9e',
    from: '2022-05-05T13:00:00+00:00',
    to: '2022-05-05T14:00:00+00:00',
    title: 'This is another event'
}, {
    id: 3,
    color: '#3694DF',
    from: '2019-05-05T13:00:00+00:00',
    to: '2019-05-05T20:00:00+00:00',
    title: 'This is also another event'
}];

const TherapistDescription = () => {
  const { loggedIn, authToken } = useAuthenticator();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  console.log(loggedIn, ' and token: ', authToken);
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
    GetUserAppointments(authToken)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return;
      });
  }, [ authToken]);
  return (
    <>
      <div>
        <h1>{data.fname}</h1>
        <h3>{data.email}</h3>
      </div>
      <h4>{data.fname}'s schedule:</h4>
      <div>
        <Calendar events={events} onClickTimeLine={() => console.log(' clicked timeLine')}/>
      </div>
      {error && (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
     </>
  );
};

export default TherapistDescription;
