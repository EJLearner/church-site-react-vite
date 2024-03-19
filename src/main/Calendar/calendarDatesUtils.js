import _ from 'lodash';
import moment from 'moment';

import firebase from '../../firebase';
import constants from '../../utils/constants';

let datesStore = {};
const callbacks = {};

const callAllCallbacks = () => {
  _.forEach(callbacks, (callback) => {
    callback();
  });
};

const loadDates = () => {
  // FBH get a reference for the 'dates' top level prop of the data
  const datesRef = firebase.database().ref(constants.FB_REF_EVENTS);

  // FBH add a listener to the dates object, update on value change
  // listener gets the dates object using snapshot.val();
  // then pushes the updated date object into the state
  datesRef.on('value', (snapshot) => {
    const retrievedDates = snapshot.val();
    const newState = {};

    _.forEach(retrievedDates, (date, key) => {
      // make an array of events
      const events = _.map(date.events, (event) => event);
      _.set(newState, `${key}.events`, events);
    });

    datesStore = newState;
    callAllCallbacks();
  });
};

loadDates();

const calendarDatesUtils = {
  getMomentForYearWeekWeekday(year, weekNumber, dayOfWeekIndex) {
    const dayMoment = moment()
      .year(year)
      .startOf('year')
      .week(weekNumber)
      .startOf('week')
      .add(dayOfWeekIndex, 'day');

    return dayMoment;
  },

  getAllDates: () => ({...datesStore}),

  getEventsForDate: (allDates, dateString) => {
    const dateObject = allDates[dateString];
    const unsortedEvents = (dateObject && dateObject.events) || [];

    return unsortedEvents.sort((a, b) => {
      const timeStartA = a.timeStart || '';
      const timeStartB = b.timeStart || '';

      if (timeStartA < timeStartB) {
        return -1;
      }

      if (timeStartA > timeStartB) {
        return 1;
      }

      return 0;
    });
  },

  listen: (id, callback) => {
    return (callbacks[id] = callback);
  },

  unlisten: (id) => {
    delete callbacks[id];
  },
};

export default calendarDatesUtils;
