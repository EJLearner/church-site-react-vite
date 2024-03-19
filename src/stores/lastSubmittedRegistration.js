let lastSubmittedRegistration;
let lastRoutePath;

/**
 * Return the registration data that was saved
 * @param {bool} removeNameAndDob - returns data that does not includes child's name and dob
 */
const getRegistrationData = (removeNameAndDob) => {
  if (lastSubmittedRegistration) {
    const returnedData = Object.assign({}, lastSubmittedRegistration);

    if (removeNameAndDob) {
      delete returnedData.studentName;
      delete returnedData.childDob;
    }

    return returnedData;
  }

  return lastSubmittedRegistration;
};

const getRoutePath = () => {
  return lastRoutePath;
};

const resetRegistrationData = () => {
  lastSubmittedRegistration = undefined;
  lastRoutePath = undefined;
};

const saveRegistrationData = (data, routePath) => {
  lastSubmittedRegistration = data;
  lastRoutePath = routePath;
};

export {
  getRegistrationData,
  getRoutePath,
  resetRegistrationData,
  saveRegistrationData,
};
