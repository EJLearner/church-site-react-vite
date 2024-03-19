const registrationUtils = {
  getPageErrors(state = {}, fieldInfo = []) {
    const errors = [];

    fieldInfo.forEach((rule) => {
      const {fieldRules = [], fieldId, label} = rule;
      const value = state[fieldId];

      fieldRules.forEach((checkFunc) => {
        const message = checkFunc(value, label, state);

        if (message) {
          errors.push({
            fieldId,
            message,
          });
        }
      });
    });

    return errors;
  },

  requireQuickContact(value, row, state) {
    const {email, homePhone, mobilePhone} = state;
    if (!(email || homePhone || mobilePhone)) {
      return 'Email, home phone or mobile phone must be provided';
    }
  },
};

export default registrationUtils;
