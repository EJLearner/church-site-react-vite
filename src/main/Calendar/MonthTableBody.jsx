import PropTypes from 'prop-types';
import React from 'react';

import commonUtils from '../../utils/commonUtils';

function MonthTableBody({todayMoment, renderRow}) {
  const firstWeekOfMonth = todayMoment.startOf('month').week();
  const lastWeekOfMonth = todayMoment.endOf('month').week();
  const includesNextYear = lastWeekOfMonth === 1;

  let lastWeekOfMonthInSameYear = lastWeekOfMonth;
  if (includesNextYear) {
    lastWeekOfMonthInSameYear = todayMoment
      .endOf('month')
      .subtract(1, 'weeks')
      .week();
  }

  const weekNumbers = commonUtils.range(
    firstWeekOfMonth,
    lastWeekOfMonthInSameYear,
  );

  const year = todayMoment.year();
  const renderedWeeks = weekNumbers.map((week) => renderRow(week, year));

  if (includesNextYear) {
    renderedWeeks.push(renderRow(1, year + 1));
  }

  return <tbody>{renderedWeeks}</tbody>;
}

MonthTableBody.propTypes = {
  renderRow: PropTypes.func,
  todayMoment: PropTypes.object,
};

export default MonthTableBody;
