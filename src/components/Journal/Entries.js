import React, { useCallback, useState, useRef, useEffect } from "react";
import { useJournal } from "../../context/JournalContext";
import { CreateJournal } from "../../api/ApiClient";
import { useAuthenticator } from "../../context/AuthContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Tabs.css";
import "../Fonts/icomoon/style.css";

const JournalEntries = ({ setError, setMessage }) => {
  const {
    journalEntries,
    removeJournalEntries,
    updateJournalEntry,
    updateJournalEntries,
  } = useJournal();
  const { authToken } = useAuthenticator();
  const [newEntry, setNewEntry] = useState(false);
  const [newBody, setNewBody] = useState(undefined);
  const [tabIndex, setTabIndex] = useState(0);
  const [newTitle, setNewTitle] = useState(undefined);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const fieldRef = useRef();
  const tabs = [];
  const tabPanels = [];

  useEffect(() => {
    if (journalEntries?.length === 0) setNewEntry(true);
  }, [journalEntries]);

  const addNewJournalEntry = useCallback(
    (title, body) => {
      try {
        CreateJournal(authToken, title, body)
          .then((response) => {
            if (response.data.success) {
              updateJournalEntries();
              setMessage("Successfully created your journal!");
            } else {
              console.log(response.data.message);
              setError(response.data.message);
            }
          })
          .catch((error) => {
            setError(error.response.data.message);
            return;
          });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [authToken]
  );

  const handleBodyOnChange = (e) => {
    setNewBody(e.target.value);
  };
  const handleTitleOnChange = (e) => {
    setNewTitle(e.target.value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (newBody && newTitle && newBody.trim().length > 0) {
      addNewJournalEntry(newTitle, newBody);
    }
    updateJournalEntries();
    setNewTitle("");
    setNewBody("");
  };
  const editJournalEntry = useCallback(() => {
    setIsEditEnabled(true);
  }, [setIsEditEnabled]);

  const handleUpdateEntry = useCallback(
    (id, title, body) => {
      updateJournalEntry(id, title, body);
      setIsEditEnabled(false);
    },
    [updateJournalEntry, setIsEditEnabled]
  );

  const handleNewJournal = () => {
    setNewEntry(true);
    setTabIndex(journalEntries.length);
  };

  journalEntries &&
    journalEntries.forEach(({ _id, title, body, createdAt, modifiedAt }) => {
      if (!_id) return;

      tabs.push(
        <Tab key={_id} disabled={isEditEnabled}>
          <p>{title}</p>
        </Tab>
      );
      tabPanels.push(
        <TabPanel key={_id}>
          {isEditEnabled ? (
            <div>
              <h1>Edit Title:</h1>
              <textarea
                className="form-control text-area"
                defaultValue={title}
                onChange={handleTitleOnChange}
                type="text"
                id="title"
                rows={1}
                maxLength={30}
                ref={fieldRef}
              />
              <h1>Edit body:</h1>
              <textarea
                className="form-control text-area"
                defaultValue={body}
                onChange={handleBodyOnChange}
                type="text"
                id="body"
                rows={11}
                ref={fieldRef}
              />
              <form>
                <div>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => setIsEditEnabled(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    type="submit"
                    onClick={() =>
                      handleUpdateEntry(_id, newTitle || title, newBody || body)
                    }
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bodyAndButtonsContainer">
              <div>
                <h1 className="entry-title">{title}</h1>
                <h5 className="entry-body">{body}</h5>
              </div>
              <div className="button-holder">
                <button
                  className="btn btn-sm new-journal-button"
                  onClick={handleNewJournal}
                >
                  <div></div>
                </button>
                <button
                  className="btn btn-sm edit-entry-button"
                  onClick={editJournalEntry}
                >
                  <div></div>
                </button>
                <button
                  className="btn btn-sm delete-entry-button"
                  onClick={() => removeJournalEntries(_id)}
                >
                  <div></div>
                </button>
              </div>
            </div>
          )}
          <div></div>
        </TabPanel>
      );
    });
  const reversedTabPanels = tabPanels.reverse();
  const reversedTabs = tabs.reverse();

  reversedTabs.push(<Tab disabled={isEditEnabled} key={1}></Tab>);
  reversedTabPanels.push(
    <TabPanel key={1}>
      <textarea
        className="form-control text-area"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        type="text"
        rows={1}
        id="title"
        maxLength={15}
        placeholder="Title"
        ref={fieldRef}
      />
      <textarea
        className="form-control text-area entry-text"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        type="text"
        id="body"
        rows={11}
        ref={fieldRef}
      />
      {newEntry && (
        <form>
          <button
            disabled={
              typeof newBody === "string" && newBody.trim().length === 0
            }
            className="btn btn-success form-control submit-entry-button"
            type="submit"
            onClick={handleOnSubmit}
          >
            Save Journal
          </button>
        </form>
      )}
    </TabPanel>
  );

  return (
    <>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <div className="scroll">{reversedTabs}</div>
        </TabList>
        {reversedTabPanels}
      </Tabs>
    </>
  );
};

export default JournalEntries;
