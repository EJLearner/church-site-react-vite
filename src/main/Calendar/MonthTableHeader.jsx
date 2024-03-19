import format from 'date-fns/format';
import setDay from 'date-fns/setDay';
import PropTypes from 'prop-types';
import React from 'react';

import commonUtils from '../../utils/commonUtils';

const formats = {
  twoChars: 'EEEEEE',
  full: 'EEEE',
};

function MonthTableHeader(props) {
  const headerCells = commonUtils.range(0, 6).map((dayOfWeekIndex) => {
    const dateObj = setDay(new Date(), dayOfWeekIndex);
    const stringDayOfWeek = format(dateObj, props.format);

    return <th key={stringDayOfWeek}>{stringDayOfWeek}</th>;
  });

  return (
    <thead>
      <tr>{headerCells}</tr>
    </thead>
  );
}

MonthTableHeader.propTypes = {
  format: PropTypes.oneOf(Object.values(formats)),
};

export {formats};

export default MonthTableHeader;
