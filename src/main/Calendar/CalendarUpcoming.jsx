import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import EventsListPage from './EventsListPage';
import calendarDatesUtils from './calendarDatesUtils';
import withDatesSubscription from './withDatesSubscription';

function getDates(maxEvents, selectedDay, storedDates) {
  const dates = [];

  let eventCount = 0;
  // just to avoid runtime errors if events don't exist
  let loopCount = 0;
  const selectedDayMoment = moment(selectedDay);
  while (eventCount < maxEvents && loopCount < 365) {
    const dateString = selectedDayMoment.format('YYYY-MM-DD');
    const daysEvents = calendarDatesUtils.getEventsForDate(
      storedDates,
      dateString,
    );

    const daysEventsCount = daysEvents.length;

    if (daysEventsCount) {
      eventCount += daysEvents.length;
      dates.push(dateString);
    }

    loopCount++;
    selectedDayMoment.add(1, 'day');
  }

  return dates;
}

class CalendarUpcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDay: moment().format('YYYY-MM-DD')};
  }

  render() {
    const {selectedDay} = this.state;
    const {storedDates} = this.props;

    return (
      <EventsListPage
        dates={getDates(10, selectedDay, storedDates)}
        emptyMessage="No events listed past this date"
        onDateChange={(dayString) => this.setState({selectedDay: dayString})}
        pageTitle="Upcoming Events"
        selectedDay={selectedDay}
        showDates
        storedDates={storedDates}
      />
    );
  }
}

CalendarUpcoming.propTypes = {
  storedDates: PropTypes.object,
};

export default withDatesSubscription(CalendarUpcoming);
