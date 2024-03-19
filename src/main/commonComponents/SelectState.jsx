import PropTypes from 'prop-types';
import React from 'react';

import Select from './Select';

const stateOptions = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'AA',
  'AE',
  'AP',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

function SelectState({id, onChange, value}) {
  return (
    <Select
      id={id}
      label="State"
      onChange={onChange}
      options={stateOptions.map((value) => ({label: value, value}))}
      value={value}
    />
  );
}

SelectState.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

SelectState.defaultProps = {
  label: 'State',
};

export default SelectState;
