import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import commonUtils from '../../utils/commonUtils';
import constants from '../../utils/constants';

import EventsListPage from './EventsListPage';
import withDatesSubscription from './withDatesSubscription';

const {INTERNAL_DATE_FORMAT} = constants;

function getDates(selectedDay) {
  const firstDay = moment(selectedDay).startOf('week');

  return commonUtils.range(0, 6).map((daysAdded) => {
    return moment(firstDay).add(daysAdded, 'days').format(INTERNAL_DATE_FORMAT);
  });
}

function renderSubTitleString(selectedDay) {
  const firstDay = moment(selectedDay)
    .startOf('week')
    .format('dddd, MMMM D, YYYY');

  return `Week of ${firstDay}`;
}

class CalendarWeek extends Component {
  constructor() {
    super();
    this.state = {selectedDay: moment().format(INTERNAL_DATE_FORMAT)};
  }

  render() {
    const {selectedDay} = this.state;

    return (
      <EventsListPage
        dates={getDates(selectedDay)}
        highlightWeek
        onDateChange={(newSelectedDay) => {
          return this.setState({selectedDay: newSelectedDay});
        }}
        pageTitle="Events This Week"
        selectedDay={selectedDay}
        storedDates={this.props.storedDates}
        subTitle={renderSubTitleString(selectedDay)}
      />
    );
  }
}

CalendarWeek.propTypes = {
  storedDates: PropTypes.object,
};

export default withDatesSubscription(CalendarWeek);
