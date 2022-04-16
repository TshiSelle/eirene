import React, { useReducer, useMemo, useCallback, useContext, useEffect } from 'react';
import { useAuthenticator } from './AuthContext';
import { UpdateJournal, GetUserJournals, DeleteJournal } from '../api/ApiClient';
const JournalContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-entries': return { ...state, journalEntries: action.data };
    case 'clear-entries': return { ...state, journalEntries: null };
    
    default: throw new Error(`Unhandled action ${action.type}!`);
  }
};

export const JournalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    journalEntries: null
  });
  const { journalEntries } = state;
  const { authToken, loggedIn } = useAuthenticator();

  useEffect((event) => {
    if (event && event.preventDefault) event.preventDefault();
    if(!loggedIn) return;
    const getJournalEntries = async () => {
      try {
        GetUserJournals(authToken)
        .then((response) => {
          if (response.data.success) {
            dispatch({ type: 'set-entries', data: response.data.journals });
          } else {
            console.log(' Failed: ', response.data);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message, ' caught Error while retrieving journal Entries  ');
          return;
        });
      } catch (error) {
        console.log(error.message, ' Caught Error');
      }
    };
    getJournalEntries();
  }, [authToken, loggedIn, journalEntries]);

  const updateJournalEntries = useCallback((journalID, title, body) => {

    if (!loggedIn) return;
    try {
      UpdateJournal(authToken, journalID, title, body)
      .then((response) => {
        if (response.data.success) {
          // The useEffect used will automatically update the journal entries..
          // so no need to handle it in this promise.
          console.log(response.data, ' Successfuly updated');
            
        } else {
          console.log(response.data.message, ' in error jorunalUpdate');
        }
      })
      .catch((error) => {
        console.log(error.response.data.message, ' Caught error');
        return;
      });
      return true;
    } catch (error) {
      console.log(error.message, ' here');
      return false;
    }
  }, [authToken, loggedIn]);

  const removeJournalEntries = useCallback((journalID) => {
    if (!loggedIn) return;
    try {
      DeleteJournal(journalID, authToken)
        .then((response) => {
          if (response.data.success) {
            console.log('successfully in delete journal', response.data);
          } else {
            console.log(' im here', response.data);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message, ' deleted failed  ');
          return;
        });
    } catch (error) {
      console.log(error.message, ' what');
      return false;
    }
  }, [loggedIn, authToken]);

  const value = useMemo(() => {
    return {
      journalEntries,
      removeJournalEntries,
      updateJournalEntries
    };
  }, [journalEntries, removeJournalEntries, updateJournalEntries]);

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) throw new Error('useJournal must be used within a JournalProvider');
  return context;
};
