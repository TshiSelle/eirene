import React, { useCallback, useState, useRef, useEffect } from "react";
import { useJournal } from "../../context/JournalContext";
import { CreateJournal } from "../../api/ApiClient";
import { useAuthenticator } from "../../context/AuthContext";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import "./Tabs.css";

const JournalEntries = ({ setError, setMessage }) => {
  const { journalEntries, removeJournalEntries, updateJournalEntries } = useJournal();
  const { authToken } = useAuthenticator();
  const [ newEntry, setNewEntry ] = useState(false);
  const [ newBody, setNewBody ] = useState(undefined);
  const [tabIndex, setTabIndex] = useState(0);
  const [ newTitle, setNewTitle ] = useState(undefined);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const fieldRef = useRef();
  const tabs = [];
  const tabPanels = [];

  useEffect(() => {
    if (journalEntries?.length === 0) setNewEntry(true);
  }, [journalEntries]);

  const addNewJournalEntry = useCallback((title, body) => {
      try {
        CreateJournal(authToken, title, body)
        .then((response) => {
          if (response.data.success) {
            setMessage('Successfully created your journal!');
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
    }, [authToken]);

  const handleBodyOnChange = e => {
    setNewBody(e.target.value);
  };
  const handleTitleOnChange = e => {
    setNewTitle(e.target.value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    if(newBody && newTitle && newBody.trim().length > 0) {
      addNewJournalEntry(newTitle, newBody);
    }
    setNewTitle('');
    setNewBody('');
  }
  const editJournalEntry = useCallback(() => {
    setIsEditEnabled(true);
  }, [setIsEditEnabled]);

  const handleUpdateEntry = useCallback((id, title, body) => {
    updateJournalEntries(id, title, body);
    setIsEditEnabled(false);
  }, [updateJournalEntries]);

  const handleNewJournal = () => {
    setNewEntry(true)
    setTabIndex(journalEntries.length);
  }

  journalEntries && journalEntries.forEach(({ _id, title, body, createdAt, modifiedAt }) => {
    if (!_id) return;

    tabs.push(
      <Tab key={_id} disabled={isEditEnabled}>
        <p>{title}</p>
      </Tab>
    );
    tabPanels.push(
      <TabPanel key={_id} style={{ flex: 5, paddingLeft: 12 }} >
          {isEditEnabled
            ? <div>
              <h1>Edit Title:</h1>
              <textarea className="form-control text-area" defaultValue={title} onChange={handleTitleOnChange} 
                type="text"
                id="title"
                rows={1}
                maxLength={30}
                ref={fieldRef}/>
              <h1>Edit body:</h1>
              <textarea className="form-control text-area" defaultValue={body} onChange={handleBodyOnChange} 
                type="text"
                id="body"
                rows={11}
                ref={fieldRef}/>
                <form>
                  <div style={{ textAlign: 'right', paddingTop: 15, paddingBottom: 15 }}>
                      <button className="btn btn-sm btn-success" style={{ marginRight: 20 }}
                      onClick={() => setIsEditEnabled(false)}>Cancel</button>
                    <button className="btn btn-sm btn-success" type="submit" style={{ marginRight: 20}}
                      onClick={() => handleUpdateEntry(_id, newTitle || title, newBody || body)}>Confirm</button>
                  </div>
                </form>
                </div>
            : <div className="bodyAndButtonsContainer">
                <div style={{ padding: 25, textAlign: 'left', flex: 3 }}>
                  <h5>{body}</h5>
                </div>
                <button className="new-journal-button"
                  onClick={handleNewJournal}>Create a new journal!</button>
                  <button className="btn btn-sm btn-success edit-button"
                    onClick={editJournalEntry}>Edit</button>
                  <button className="btn btn-sm btn-danger" style={{ marginRight: 20, width: 140 }}
                      onClick={() => removeJournalEntries(_id)}>Delete this journal</button>
              </div>}
          <div>
        </div>
      </TabPanel>
    );
  });
  const reversedTabPanels = tabPanels.reverse();
  const reversedTabs = tabs.reverse();

  reversedTabs.push(
    <Tab disabled={isEditEnabled} key={1}>
      
    </Tab>
  );
  reversedTabPanels.push(
    <TabPanel key={1} style={{ flex: 5, paddingBottom: 20, paddingLeft: 12 }}>
      <h1 style={{paddingTop: 5 }}>Add a title: </h1>
      <textarea className="form-control text-area"
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)} 
        type="text"
        rows={1}
        id="title" 
        maxLength={15}
        ref={fieldRef} />
      <h1 style={{paddingTop: 15 }}>Express your thoughts! </h1>
      <textarea
        className="form-control text-area"
        value={newBody}
        onChange={e => setNewBody(e.target.value)} 
        type="text"
        id="body"
        rows={11}
        ref={fieldRef} />
        {newEntry &&
        <form>
          <button disabled={typeof(newBody) === 'string' && newBody.trim().length === 0} 
            className="btn btn-success form-control" style={{ marginRight: 20 }}
            type="submit" onClick={handleOnSubmit}>Submit</button>
        </form>}
    </TabPanel>
  );

  return (
    <>
     <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}
      style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TabList style={{ flex: 1 }}>
            <div className="scroll">
              {reversedTabs}
            </div>
          </TabList>
          {reversedTabPanels}
        </Tabs>
    </>
  );
};

export default JournalEntries;
