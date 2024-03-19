import moment from 'moment';

import constants from '../../utils/constants';

const validDateFormats = ['M/D/YY', 'M/D/YYYY', 'M-D-YYYY', 'M-D-YY'];

const fieldValidators = {
  disclaimerIsChecked: (value) => {
    if (value !== true) {
      return 'Please indicate that you agree to the terms.';
    }
  },

  isNotEmpty: (value, label) => {
    if (!value) {
      return `${label} is required`;
    }
  },

  isDate: (value, label) => {
    const valid = moment(
      value,
      constants.VALID_INPUT_DATE_FORMATS,
      true,
    ).isValid();
    if (value && !valid) {
      return `${label} is not in format mm/dd/yyyy`;
    }
  },

  isAllLetters: (value, label) => {
    const valid = value.match(/^[a-z ]+$/i);
    if (value && !valid) {
      return `${label} must only consist of letters`;
    }
  },

  isValidZip: (value, label) => {
    const valid = value.match(/^\d{5}(-\d{4})?$/);
    if (value && !valid) {
      return `${label} must be a valid zip code`;
    }
  },

  isValidEmail: (value, label) => {
    const valid = value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    if (value && !valid) {
      return `${label} must be a valid email address.`;
    }
  },

  isAtLeastTwoCharacters: (value, label) => {
    const valid = value && value.length > 1;
    if (value && !valid) {
      return `${label} is not valid.`;
    }
  },

  isPhoneNumber: (value, label) => {
    const phoneDigits = value.replace(/[^0-9]/g, '');
    const valid = phoneDigits.length === 10;
    if (value && !valid) {
      return `${label} is not a valid phone number`;
    }
  },
};

fieldValidators.validDateFormats = validDateFormats;

export default fieldValidators;
