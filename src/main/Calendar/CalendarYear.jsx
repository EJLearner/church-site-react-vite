import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';

import routePaths from '../../routePaths';
import commonUtils from '../../utils/commonUtils';

import MiniCalendar from './MiniCalendar';

const StyledCalendarYear = styled.div`
  margin: auto;

  h2 {
    font-weight: normal;
    text-align: center;
    margin-bottom: 0;
  }

  .year-calendar-months-display {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .yearly-calendar-month-wrapper {
    margin: 1em;
  }
`;

function getMiniCalendarMonths(firstMonth) {
  return commonUtils.range(0, 11).map((monthsAdded) => {
    return moment(firstMonth).add(monthsAdded, 'months').format('YYYY-MM-DD');
  });
}

class CalendarYear extends Component {
  constructor(props) {
    super(props);

    this.state = {redirectDate: null};
  }

  renderMonths() {
    return getMiniCalendarMonths(this.props.firstMonth).map((monthDate) => {
      let selectedDay = monthDate;
      let highlightSelectedDay = false;

      if (moment(monthDate).isSame(moment(), 'month')) {
        selectedDay = moment().format('YYYY-MM-DD');
        highlightSelectedDay = true;
      }

      return (
        <div className="yearly-calendar-month-wrapper" key={selectedDay}>
          <MiniCalendar
            allDatesClickable
            highlightSelectedDay={highlightSelectedDay}
            onDateClick={(dayString) =>
              this.setState({redirectDate: dayString})
            }
            selectedDay={selectedDay}
            yearDisplayMode
          />
        </div>
      );
    });
  }

  redirect() {
    return (
      <Redirect
        push
        to={{
          pathname: routePaths.MAIN_CALENDAR_DAY,
          state: {selectedDay: this.state.redirectDate},
        }}
      />
    );
  }

  render() {
    if (this.state.redirectDate) {
      return this.redirect();
    }

    return (
      <StyledCalendarYear>
        <h2>Yearly Events Calendar</h2>
        <div className="year-calendar-months-display">
          {this.renderMonths()}
        </div>
      </StyledCalendarYear>
    );
  }
}

CalendarYear.propTypes = {
  firstMonth: PropTypes.string,
};

CalendarYear.defaultProps = {
  firstMonth: moment().format('YYYY-MM-DD'),
};

export default CalendarYear;
