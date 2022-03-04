import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { FilterTherapists } from "../../api/ApiClient";
import { Alert, Form, Card, ListGroup, ListGroupItem } from "react-bootstrap";
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
            <div
              key={key}
              className="therapistContainer"
            >
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{therapist.fname} {therapist.lname}</Card.Title>
                  <Card.Text>
                    {therapist.description}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem><h3>{therapist.title}</h3></ListGroupItem>
                  <ListGroupItem>Email: {therapist.email}</ListGroupItem>
                  <ListGroupItem>Phone: {therapist.phone}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Card.Link href={`/therapist-description/${therapist._id}`}>
                     Card Link</Card.Link>
                </Card.Body>
              </Card>
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
