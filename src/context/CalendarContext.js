import React, { useReducer, useMemo, useCallback, useContext, useEffect } from 'react';
import { CreateUserAppointment, GetUserAppointments, DeleteUserAppointment } from '../api/ApiClient';
import { useAuthenticator } from './AuthContext';

const CalendarContext = React.createContext();

const KEY = 'calendar_scheduling';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-calendar-appointments': return { ...state, userCalendarAppointments: action.calendarAppointments };
    case 'clear-calendar-appointments': return { ...state, userCalendarAppointments: null };
    default: throw new Error(`Unhandled action ${action.type}!`);
  }
};

export const CalendarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    userCalendarAppointments: null
  });

  const { authToken } = useAuthenticator();
  const { userCalendarAppointments } = state;
  useEffect(() => {
    if (!authToken) return;
    GetUserAppointments(authToken)
      .then((response) => {
        if (response.data.success) {
            if (response.data.message) {
                console.log('no calendar appointments found...');
            } else {
                dispatch({ type: 'set-calendar-appointments', calendarAppointments: response.data.calendarEvents })
            }
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return;
      });
  }, [authToken]);

  const deleteAppointment = ({ eventID }) => {
      if (!authToken) return;
      DeleteUserAppointment(authToken, eventID)
      .then((response) => {
        if (response.data.success) {
            // if (response.data.message) {
                console.log('calendar Event deleted...');
            // } else {
            //     dispatch({ type: 'set-calendar-appointments', calendarAppointments: response.data.calendarEvents })
            // }
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return;
      });
  }
  const value = useMemo(() => {
    return {
        userCalendarAppointments,
        deleteAppointment
    };
  }, [userCalendarAppointments, deleteAppointment]);

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useUserCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error('useUserCalendar must be used within a CalendarProvider');
  return context;
};
