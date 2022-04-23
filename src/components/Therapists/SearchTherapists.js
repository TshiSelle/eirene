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

  useEffect(
    (event) => {
      if (event) event.preventDefault();
      if (!query) return;
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
    },
    [query]
  );

  const setQueryValue = useCallback((e) => setQuery(e.target.value));

  return (
    <div>
      <Form className="therapistSearch" onSubmit={() => event.preventDefault()}>
        <Form.Control
          className="searchField"
          type="text"
          value={query}
          isInvalid={error}
          placeholder="Search..."
          name="Search For Therapists"
          id="search"
          onChange={setQueryValue}
        />
        <label htmlFor="search"></label>
      </Form>
      <div className="therapist-parent-container">
        {data.map((therapist, key) => {
          return (
            <div key={key} className="therapist-container">
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
