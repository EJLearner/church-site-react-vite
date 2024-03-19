import _ from 'lodash';
import moment from 'moment';

import routePaths from '../routePaths';
import constants from '../utils/constants';

const {
  INTERNAL_DATE_FORMAT,
  INTERNAL_TIMESTAMP_FORMAT,
  DISPLAY_DATE_FORMAT,
  DISPLAY_TIME_FORMAT,
  SORT_DIRECTION_ASCENDING,
} = constants;

// Modeled after base64 web-safe chars, but ordered by ASCII.
const PUSH_CHARS =
  '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

// Timestamp of last push, used to prevent local collisions if you push twice in one ms.
let lastPushTime = 0;

// We generate 72-bits of randomness which get turned into 12 characters and appended to the
// timestamp to prevent collisions with other clients.  We store the last characters we
// generated because in the event of a collision, we'll use those same characters except
// "incremented" by one.
const lastRandChars = [];

const commonUtils = {
  formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
  },

  /**
   * Converts Time in iso format to a more readable one
   * @param {string} date - in iso format
   */
  formatDate(date) {
    if (!date) {
      return '';
    }

    return moment(date, INTERNAL_DATE_FORMAT).format(DISPLAY_DATE_FORMAT);
  },

  /**
   * Formats a string containing ten digits into a phone number
   * disregarding anything that is not a digit
   * @param {string} number - ten digit phone number
   * @param {bool} nonbreaking - use nonbreaking spaces when truthy
   */
  formatPhoneNumber(number, nonbreaking) {
    const onlyDigits = number && number.replace(/[^0-9]/g, '');
    const valid = onlyDigits && onlyDigits.length === 10;
    if (onlyDigits && valid) {
      const firstThree = onlyDigits.substr(0, 3);
      const secondThree = onlyDigits.substr(3, 3);
      const lastFour = onlyDigits.substr(6);

      const space = nonbreaking ? String.fromCharCode(160) : ' ';
      const hyphen = nonbreaking ? String.fromCharCode(8209) : '-';

      return `(${firstThree})${space}${secondThree}${hyphen}${lastFour}`;
    }

    return number;
  },

  formatShippingCost(number) {
    return number ? commonUtils.formatCurrency(number) : 'Free';
  },

  /**
   * Converts Time in iso format to a more readable one
   * @param {string} time - in iso format
   */
  formatTime(timeStamp) {
    if (!timeStamp) {
      return '';
    }

    return moment(timeStamp, INTERNAL_TIMESTAMP_FORMAT, true).format(
      DISPLAY_TIME_FORMAT,
    );
  },

  /**
   * Fancy ID generator that creates 20-character string identifiers with the following properties:
   *
   * 1. They're based on timestamp so that they sort *after* any existing ids.
   * 2. They contain 72-bits of random data after the timestamp so that IDs won't collide with other clients' IDs.
   * 3. They sort *lexicographically* (so the timestamp is converted to characters that will sort properly).
   * 4. They're monotonically increasing.  Even if you generate more than one in the same timestamp, the
   *    latter ones will sort after the former ones.  We do this by using the previous random bits
   *    but "incrementing" them by 1 (only in the case of a timestamp collision).
   */
  generatePushID() {
    let now = new Date().getTime();
    const duplicateTime = now === lastPushTime;
    lastPushTime = now;

    const timeStampChars = new Array(8);
    for (let i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
      now = Math.floor(now / 64);
    }
    if (now !== 0) {
      throw new Error('We should have converted the entire timestamp.');
    }

    let id = timeStampChars.join('');

    if (!duplicateTime) {
      for (let i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      let i;
      // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (let i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if (id.length !== 20) throw new Error('Length should be 20.');

    return id;
  },

  /**
   * Returns years as number for a given dob
   * @param {string} dob - dob in format 'YYYY-MM-DD'
   * @returns {number} - years old as number
   */
  getAge(dob) {
    const dobMoment = moment(dob, INTERNAL_DATE_FORMAT);
    return moment().diff(dobMoment, 'years');
  },

  getCcDbYear() {
    const currentMoment = moment();
    const currentYear = currentMoment.year();
    // moment/date months start at 0, adding 1 to avoid my confusion
    const currentMonth = currentMoment.month + 1;

    // if date is in July or later, return the current year
    if (currentMonth >= 7) {
      return currentYear - 1;
    }

    // else return the previous year
    return currentYear;
  },

  getComputedPath(path, pathKey) {
    if (path) {
      return path;
    }

    // eslint-disable-next-line no-prototype-builtins
    if (routePaths.hasOwnProperty(pathKey)) {
      return routePaths[pathKey];
    }

    throw new Error(
      `Can not get valid route from path ${path} and pathKey ${pathKey}`,
    );
  },

  getVbsDbYear() {
    // for now, just always return the current year
    return moment().year();
  },

  lodashForEach(data, func) {
    return _.forEach(data, func);
  },

  merge(...args) {
    _.merge(...args);
  },

  pluralizer(word, count) {
    if (typeof word === 'string') {
      return count === 1 ? word : `${word}s`;
    }

    return count === 1 ? word[0] : word[1];
  },

  range: (startIndex, endIndex) => _.range(startIndex, endIndex + 1),

  sort(array, getSortValue, direction = SORT_DIRECTION_ASCENDING) {
    return array?.sort((a, b) => {
      const reverseMultiplier = direction === SORT_DIRECTION_ASCENDING ? 1 : -1;
      const valueA = getSortValue(a);
      const valueB = getSortValue(b);

      if (valueA === valueB) {
        return 0;
      }

      return valueA < valueB ? -1 * reverseMultiplier : 1 * reverseMultiplier;
    });
  },
};

export default commonUtils;
