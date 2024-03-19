import {useState, useEffect} from 'react';

import firebase from '../firebase';
import constants from '../utils/constants';
import {
  endOfYesterday,
  parseISO,
  startOfDay,
  isAfter,
} from '../utils/dateTimeUtils';

const sortEventsByStartTime = (events) => {
  return events.sort((a, b) => {
    const timeStartA = a.timeStart || '';
    const timeStartB = b.timeStart || '';

    if (timeStartA === timeStartB) {
      return 0;
    }

    // just doing string compare since standard date-time string is used
    return timeStartA < timeStartB ? -1 : 1;
  });
};

function useFirebaseEvents(options = {}) {
  const {futureOnly, returnAsArray} = options;

  const [events, setEventsList] = useState({});

  useEffect(() => {
    // FBH get a reference for the 'dates' top level prop of the data
    const datesRef = firebase.database().ref(constants.FB_REF_EVENTS);

    // FBH add a listener to the dates object, update on value change
    // listener gets the dates object using snapshot.val();
    // then pushes the udpated date object into the state
    datesRef.on('value', (snapshot) => {
      const retrievedDates = snapshot.val();
      const newState = {};

      Object.keys(retrievedDates).forEach((date) => {
        const jsDate = parseISO(date);
        const startOfJsDate = startOfDay(jsDate);
        const isInFuture = isAfter(startOfJsDate, endOfYesterday());

        if (!futureOnly || isInFuture) {
          const eventInfo = retrievedDates[date];
          // make an array of events
          if (eventInfo.events) {
            const events = Object.values(eventInfo.events).map(
              (event) => event,
            );
            newState[date] = {events};
          }
        }
      });

      setEventsList(newState);
    });
  }, [futureOnly, returnAsArray]);

  if (returnAsArray) {
    const datesAsArray = Object.keys(events).reduce(
      (eventsArray, dateString) => {
        const sortedDateEvents = sortEventsByStartTime(
          events[dateString].events,
        );

        sortedDateEvents.forEach((event) => {
          const eventWithDate = {
            ...event,
            dateString,
          };

          eventsArray.push(eventWithDate);
        });

        return eventsArray;
      },
      [],
    );

    return datesAsArray;
  }

  return events;
}

export default useFirebaseEvents;
