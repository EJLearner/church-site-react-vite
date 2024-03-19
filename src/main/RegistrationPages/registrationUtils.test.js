import registrationUtils from './registrationUtils';

describe('registrationUtils', () => {
  describe('#requireQuickContact', () => {
    let testState;

    beforeEach(() => {
      testState = {
        email: 'test@blah.com',
        homePhone: '410-123-1234',
        mobilePhone: '443-123-1235',
      };
    });

    it('returns error when none of the things are provided', () => {
      delete testState.email;
      delete testState.homePhone;
      delete testState.mobilePhone;

      expect(
        registrationUtils.requireQuickContact(undefined, undefined, testState),
      ).toBeDefined();
    });

    it('does not return error when email is provided', () => {
      delete testState.homePhone;
      delete testState.mobilePhone;

      expect(
        registrationUtils.requireQuickContact(undefined, undefined, testState),
      ).not.toBeDefined();
    });

    it('does not return error when homePhone is provided', () => {
      delete testState.email;
      delete testState.mobilePhone;

      expect(
        registrationUtils.requireQuickContact(undefined, undefined, testState),
      ).not.toBeDefined();
    });

    it('does not return error when mobilePhone is provided', () => {
      delete testState.email;
      delete testState.homePhone;

      expect(
        registrationUtils.requireQuickContact(undefined, undefined, testState),
      ).not.toBeDefined();
    });
  });
});
