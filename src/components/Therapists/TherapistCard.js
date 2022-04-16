import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from 'react-router-dom';

const TherapistCard = ({ therapist }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          {therapist.fname} {therapist.lname}
        </Card.Title>
        <Card.Text>{therapist.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <h3>{therapist.title}</h3>
        </ListGroupItem>
        <ListGroupItem>Email: {therapist.email}</ListGroupItem>
        <ListGroupItem>Phone: {therapist.phone}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Link to={`/therapist-description/${therapist._id}`}>
          Card Link
        </Link>
      </Card.Body>
    </Card>
  );
};

export default TherapistCard;
