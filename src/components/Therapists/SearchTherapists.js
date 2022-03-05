import React, { useState, useCallback, useEffect } from "react";
// import { Link } from "react-router-dom";
import TherapistCard from "./TherapistCard";
import { FilterTherapists } from "../../api/ApiClient";
import { Alert, Form } from "react-bootstrap";
import "./TherapistSearch.css";

const searchTherapists = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    event.preventDefault();
    FilterTherapists(query)
      .then((response) => {
        if (response.data.success) {
          setData(response.data.searchResults);
          setError("");
        } else {
          setError(response.data.message);
          setData([]);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setData([]);
        return;
      });
  }, [query]);

  const setQueryValue = useCallback((e) => setQuery(e.target.value));

  return (
    <div>
      <Form className="therapistSearch" onSubmit={() => event.preventDefault()}>
        <Form.Control
          className="textField"
          type="text"
          value={query}
          isInvalid={error}
          placeholder="Search for therapists.."
          name="Search For Therapists"
          onChange={setQueryValue}
        />
      </Form>
      <div>
        {data.map((therapist, key) => {
          console.log(therapist);
          return (
            <div key={key} className="therapistContainer">
              <TherapistCard therapist={therapist} />
            </div>
          );
        })}
      </div>
      {error && (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
    </div>
  );
};

export default searchTherapists;