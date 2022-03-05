import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./TherapistSearch.css";
import { GetFilteredTherapist } from "../../api/ApiClient";
import { useAuthenticator } from "../../context/AuthContext";

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
          console.log(response.data);
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
  }, [id, setData, setError]);

  return (
    <>
      <div>
        <h1>{data.fname}</h1>
        <h3>{data.email}</h3>
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
