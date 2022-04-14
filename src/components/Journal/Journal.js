import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuthenticator } from "../../context/AuthContext";
import JournalEntries from "./Entries";
import { useJournal } from "../../context/JournalContext";

const Journal = () => {
  const { loggedIn } = useAuthenticator();
  const { journalEntries } = useJournal();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  console.log(loggedIn, " loggedIN");
  return (
    <div>
      {loggedIn ? (
        journalEntries?.length === 0 
          ? <>
              <h2>Looks like you dont have any journals yet...</h2>
              <p>Start your first journal right away!</p>
              <JournalEntries setMessage={setMessage} setError={setError} />
              
            </>
          : <JournalEntries setMessage={setMessage} setError={setError} />
      ) : (
        <h2>Please login to access the journal</h2>
      )}
      {error ? (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      ) : message ? (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="success">{message}</Alert>
        </div>
      ) : null}
    </div>
  );
};
export default Journal;
