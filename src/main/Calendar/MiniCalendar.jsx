import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'styled-components';

import commonUtils from '../../utils/commonUtils';

import MonthTableBody from './MonthTableBody';
import MonthTableHeader, {formats as headerFormats} from './MonthTableHeader';
import calendarDatesUtils from './calendarDatesUtils';

const CONTROLS = {
  PREV: 'PREV',
  NEXT: 'NEXT',
};
const MiniCalendarStyle = styled.div`
  border-radius: 20px;
  background-color: white;
  padding: 1em;
  width: 420px;

  .controls-and-month-name {
    display: flex;
    font-size: 24px;
    justify-content: space-between;
    margin-bottom: 1em;

    button {
      background-color: inherit;
      border: none;
      padding: 0 20px;
      min-height: 40px;

      i {
        padding: 3px;
        font-size: 20px;
        border: 1px solid;
        border-radius: 10px;
        border-color: rgba(0, 0, 0, 0);
      }

      &:hover {
        i {
          border-color: initial;
        }
        cursor: pointer;
      }
    }

    &.no-controls {
      justify-content: center;
      margin-bottom: 0.3em;
    }
  }

  table {
    border-collapse: collapse;
    box-sizing: border-box;
    margin: auto;
    table-layout: fixed;
    width: 100%;

    th,
    td {
      font-weight: normal;
      height: 40px;
      padding: 0;
      text-align: center;
      vertical-align: middle;

      &.clickable {
        cursor: pointer;
      }

      &.selected-day div {
        border-radius: 20px / 20px;
        background-color: var(--accent-background);
      }

      &.selected-week div {
        background-color: var(--accent-background);
      }

      &.has-events div {
        border-radius: 20px / 20px;
        background-color: var(--accent-background-2);
      }
    }

    td.selected-week:first-child div {
      border-radius: 20px 0 0 20px;
    }

    td.selected-week:last-child div {
      border-radius: 0 20px 20px 0;
    }
  }
`;

class MiniCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allDates: calendarDatesUtils.getAllDates(),
    };
  }

  componentDidMount() {
    calendarDatesUtils.listen('mini-calendar', () => {
      this.setState({
        allDates: calendarDatesUtils.getAllDates(),
      });
    });
  }

  componentWillUnmount() {
    calendarDatesUtils.unlisten('mini-calendar');
  }

  addMonth(monthsToAdd) {
    if (this.props.onDateChange) {
      const newDate = moment(this.props.selectedDay)
        .add(monthsToAdd, 'months')
        .format('YYYY-MM-DD');

      this.props.onDateChange(newDate);
    }
  }

  onClickCell(dayString, daysEventsCount) {
    if (this.props.onDateChange) {
      this.props.onDateChange(dayString, daysEventsCount);
    }

    if (
      this.props.onDateClick &&
      (daysEventsCount || this.props.allDatesClickable)
    ) {
      this.props.onDateClick(dayString, daysEventsCount);
    }
  }

  renderTableBodyRow(weekNumber, year) {
    const {
      allDatesClickable,
      highlightSelectedDay,
      highlightWeek,
      selectedDay,
    } = this.props;

    const renderedDays = commonUtils.range(0, 6).map((dayOfWeekIndex) => {
      const dayMoment = calendarDatesUtils.getMomentForYearWeekWeekday(
        year,
        weekNumber,
        dayOfWeekIndex,
      );

      const dayString = dayMoment.format('YYYY-MM-DD');

      const daysEventsCount = calendarDatesUtils.getEventsForDate(
        this.state.allDates,
        dayString,
      ).length;

      const isOtherMonth = !dayMoment.isSame(selectedDay, 'month');
      const isSelectedDay = dayMoment.isSame(selectedDay, 'day');
      const isSelectedWeek = dayMoment.isSame(selectedDay, 'week');

      const tdClassName = [
        'date-cell',
        daysEventsCount && 'has-events',
        (daysEventsCount || allDatesClickable) && 'clickable',
        isOtherMonth && 'other-month',
        highlightSelectedDay &&
          !highlightWeek &&
          isSelectedDay &&
          'selected-day',
        highlightWeek && isSelectedWeek && 'selected-week',
      ]
        .filter((text) => text)
        .join(' ');

      let daysEventsMessage = '';
      if (daysEventsCount) {
        const eventOrEventsString = daysEventsCount > 1 ? 'events' : 'event';

        daysEventsMessage = ` ${daysEventsCount} ${eventOrEventsString} this day. Click for more info`;
      }

      return (
        <td
          className={tdClassName}
          key={dayOfWeekIndex}
          onClick={() => this.onClickCell(dayString, daysEventsCount)}
          title={dayMoment.format('LL') + daysEventsMessage}
        >
          <div>{dayMoment.date()}</div>
        </td>
      );
    });

    return <tr key={weekNumber}>{renderedDays}</tr>;
  }

  renderControls(control) {
    if (!this.props.yearDisplayMode) {
      let direction;
      let addition;
      let previousOrNext;

      if (control === CONTROLS.PREV) {
        direction = 'left';
        addition = -1;
        previousOrNext = 'previous';
      } else {
        direction = 'right';
        addition = 1;
        previousOrNext = 'next';
      }

      return (
        <button
          onClick={() => this.addMonth(addition)}
          title={`Change to ${previousOrNext} month.`}
        >
          <i className={`fa fa-angle-double-${direction}`} />
        </button>
      );
    }
  }

  render() {
    let monthNameClassName = 'controls-and-month-name';

    if (this.props.yearDisplayMode) {
      monthNameClassName += ' no-controls';
    }

    return (
      <MiniCalendarStyle className="mini-calendar">
        <div className={monthNameClassName}>
          {this.renderControls(CONTROLS.PREV)}
          {moment(this.props.selectedDay).format('MMMM YYYY')}
          {this.renderControls(CONTROLS.NEXT)}
        </div>
        <table>
          <MonthTableHeader format={headerFormats.twoChars} />
          <MonthTableBody
            renderRow={(weekNumber, year) =>
              this.renderTableBodyRow(weekNumber, year)
            }
            todayMoment={moment(this.props.selectedDay)}
          />
        </table>
      </MiniCalendarStyle>
    );
  }
}

MiniCalendar.propTypes = {
  allDatesClickable: PropTypes.bool,
  highlightSelectedDay: PropTypes.bool,
  highlightWeek: PropTypes.bool,
  onDateChange: PropTypes.func,
  onDateClick: PropTypes.func,
  selectedDay: PropTypes.string,
  yearDisplayMode: PropTypes.bool,
};

MiniCalendar.defaultProps = {
  allDatesClickable: true,
  highlightWeek: false,
  highlightSelectedDay: true,
  yearDisplayMode: false,
};

export default MiniCalendar;
