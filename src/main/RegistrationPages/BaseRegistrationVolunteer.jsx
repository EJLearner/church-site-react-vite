import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Redirect} from 'react-router';

import firebase from '../../firebase';
import routePaths from '../../routePaths';
import utils from '../../utils/commonUtils';
import constants from '../../utils/constants';
import pushToSubscribedList from '../../utils/pushToSubscribedList';
import Button from '../commonComponents/Button/Button';
import Checkbox from '../commonComponents/Checklist/Checkbox';
import Checklist from '../commonComponents/Checklist/Checklist';
import ErrorList from '../commonComponents/ErrorList';
import Modal from '../commonComponents/Modal/Modal';
import PostSubmitStatusMessage from '../commonComponents/PostSubmitStatusMessage';
import Textbox from '../commonComponents/Textbox';

import DisclaimerCheckbox from './DisclaimerCheckbox';
import fieldValidators from './fieldValidators';
import registrationUtils from './registrationUtils';

import './Registration.css';

const USE_TEST_DATA = false;

const FIELDS_INFO = {
  email: {
    fieldId: 'email',
    label: 'Email Address',
    fieldRules: [fieldValidators.isValidEmail],
  },
  name: {
    fieldId: 'name',
    label: 'Name',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters,
    ],
  },
  dob: {
    fieldId: 'dob',
    label: 'Date of Birth',
    fieldRules: [fieldValidators.isDate],
  },

  address1: {
    fieldId: 'address1',
    label: 'Address Line 1',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters,
    ],
  },
  address2: {fieldId: 'address2', label: 'Address Line 2'},
  city: {
    fieldId: 'city',
    label: 'City',
    fieldRules: [
      fieldValidators.isAllLetters,
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters,
    ],
  },
  state: {
    fieldId: 'state',
    label: 'State',
    fieldRules: [
      fieldValidators.isAllLetters,
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters,
    ],
  },
  zip: {
    fieldId: 'zip',
    label: 'ZIP Code',
    fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isValidZip],
  },
  mobilePhone: {
    fieldId: 'mobilePhone',
    label: 'Mobile Phone',
    fieldRules: [fieldValidators.isPhoneNumber],
  },
  homePhone: {
    fieldId: 'homePhone',
    label: 'Home Phone',
    fieldRules: [
      fieldValidators.isPhoneNumber,
      registrationUtils.requireQuickContact,
    ],
  },
  teacher: {
    default: false,
    fieldId: 'teacher',
    label: 'Teacher',
  },
  admin: {
    default: false,
    fieldId: 'admin',
    label: 'Administrative Staff',
  },
  assistantMentor: {
    default: false,
    fieldId: 'assistantMentor',
    label: 'Class Assistant/Hallway Monitor',
  },
  kitchen: {
    default: false,
    fieldId: 'kitchen',
    label: 'Kitchen Staff',
  },
  otherText: {
    fieldId: 'otherText',
    label: 'Other Role',
  },
  sundaySchool: {
    default: false,
    fieldId: 'sundaySchool',
    label: 'Sunday School',
  },
  bibleSchool: {
    default: false,
    fieldId: 'bibleSchool',
    label: 'Vacation Bible School',
  },
  youthMinistry: {
    default: false,
    fieldId: 'youthMinistry',
    label: 'Youth Ministory',
  },
  pastTeacher: {
    default: false,
    fieldId: 'pastTeacher',
    label: 'Teacher',
  },
  pastAdmin: {
    default: false,
    fieldId: 'pastAdmin',
    label: 'Administrative Staff',
  },
  pastTransition: {
    default: false,
    fieldId: 'pastTransition',
    label: 'Transition Team',
  },
  pastKitchen: {
    default: false,
    fieldId: 'pastKitchen',
    label: 'Kitchen Staff',
  },
  pastChaperone: {
    default: false,
    fieldId: 'pastChaperone',
    label: 'Chaperon',
  },
  monday: {
    default: false,
    fieldId: 'monday',
    label: 'Monday',
  },
  tuesday: {
    default: false,
    fieldId: 'tuesday',
    label: 'Tuesday',
  },
  wednesday: {
    default: false,
    fieldId: 'wednesday',
    label: 'Wednesday',
  },
  thursday: {
    default: false,
    fieldId: 'thursday',
    label: 'Thursday',
  },
  friday: {
    default: false,
    fieldId: 'friday',
    label: 'Friday',
  },
  subscribe: {
    fieldId: 'subscribe',
    default: false,
    label: 'Subscribe',
  },
  agreementChecked: {
    fieldId: 'agreementChecked',
    label: 'Terms Agreement Checkbox',
    fieldRules: [fieldValidators.disclaimerIsChecked],
    showInConfirmation: false,
  },
};

class BaseRegistrationVolunteer extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState();

    this.onChangeInput = this.onChangeInput.bind(this);
    this.renderFormFields = this.renderFormFields.bind(this);
    this.validateAndSubmit = this.validateAndSubmit.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.postStatus && this.state.postStatus) {
      const successBox = document.getElementById('success-error-box');
      successBox.focus();
    }
  }

  getState() {
    const testData = {
      email: 'lskdjf@sdklfjsd.com',
      name: 'test name',
      dob: '01/01/2018',
      address1: 'test address 1',
      address2: 'test address 2',
      city: 'test',
      state: 'test state',
      zip: '20103',
      mobilePhone: '000-000-0123',
      homePhone: '000-000-1111',
      teacher: true,
      admin: true,
      assistantMentor: true,
      kitchen: true,
      otherText: 'Something else',
      sundaySchool: true,
      bibleSchool: true,
      youthMinistry: true,
      pastTeacher: true,
      pastAdmin: true,
      pastTransition: true,
      pastKitchen: true,
      pastChaperone: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
    };

    const fieldStates = {};

    Object.values(FIELDS_INFO).forEach((fieldData) => {
      const {fieldId} = fieldData;
      let value = '';

      if (fieldData.default !== undefined) {
        value = fieldData.default;
      }

      if (value === '' && USE_TEST_DATA) {
        value = testData[fieldId];
      }

      fieldStates[fieldId] = value;
    });

    return {
      ...fieldStates,
      errors: [],
      redirect: false,
      showModal: false,
      showOther: false,
      [FIELDS_INFO.agreementChecked.fieldId]: false,
    };
  }

  onChangeInput(value, id) {
    this.setState({[id]: value, postStatus: undefined});
  }

  pushToFirebase() {
    const {refName, volunteerIdPropName} = this.props;
    const {subscribe, email, name} = this.state;

    const volunteer = {
      [volunteerIdPropName]: utils.generatePushID(),
      timeChanged: new Date().toISOString(),
    };

    Object.values(FIELDS_INFO).forEach(({fieldId}) => {
      volunteer[fieldId] = this.state[fieldId];
    });

    const standardDob = moment(
      this.state.dob,
      constants.VALID_INPUT_DATE_FORMATS,
    ).format(constants.INTERNAL_DATE_FORMAT);

    volunteer.dob = standardDob;

    const firebaseRef = firebase.database().ref(refName);

    if (subscribe && email) {
      pushToSubscribedList(email, 'Volunteer Registration', name);
    }

    firebaseRef
      .push(volunteer)
      .then(() => {
        this.postSubmitSuccess();
      })
      .catch((responseError) => {
        this.setState({postStatus: 'failure', responseError});
      });
  }

  validateAndSubmit() {
    const errors = registrationUtils.getPageErrors(
      this.state,
      Object.values(FIELDS_INFO),
    );

    this.setState({
      postStatus: undefined,
      showModal: !errors.length,
      errors,
    });
  }

  postSubmitSuccess() {
    this.setState({redirect: true});
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  renderFormFields() {
    const widthBase = 15;

    return (
      <div id="form-fields">
        <Textbox
          id="email"
          label="Email Address"
          onChange={this.onChangeInput}
          size={2 * widthBase}
          value={this.state.email}
        />
        <br />

        <Textbox
          id="name"
          label="Name"
          onChange={this.onChangeInput}
          required
          size={2 * widthBase}
          value={this.state.name}
        />
        <Textbox
          id="dob"
          label="Date of Birth"
          onChange={this.onChangeInput}
          placeholder="mm/dd/yyyy"
          size={1 * widthBase}
          value={this.state.dob}
        />
        <Textbox
          id="address1"
          label="Address Line 1"
          onChange={this.onChangeInput}
          required
          size={4 * widthBase}
          value={this.state.address1}
        />
        <br />

        <Textbox
          id="address2"
          label="Address Line 2"
          onChange={this.onChangeInput}
          size={4 * widthBase}
          value={this.state.address2}
        />
        <br />

        <Textbox
          id="city"
          label="City"
          onChange={this.onChangeInput}
          required
          size={1.5 * widthBase}
          value={this.state.city}
        />
        <Textbox
          id="state"
          label="State"
          onChange={this.onChangeInput}
          required
          size={1.5 * widthBase}
          value={this.state.state}
        />
        <Textbox
          id="zip"
          label="ZIP Code"
          onChange={this.onChangeInput}
          required
          size={Math.floor(0.8 * widthBase)}
          value={this.state.zip}
        />
        <br />

        <Textbox
          id="mobilePhone"
          label="Mobile Phone"
          onChange={this.onChangeInput}
          size={1 * widthBase}
          value={this.state.mobilePhone}
        />
        <Textbox
          id="homePhone"
          label="Home Phone"
          onChange={this.onChangeInput}
          size={1 * widthBase}
          value={this.state.homePhone}
        />
        <br />

        <Checklist
          checklistItems={[
            {
              label: 'Teacher',
              value: 'teacher',
              checked: this.state.teacher,
            },
            {
              label: 'Administrative Staff',
              value: 'admin',
              checked: this.state.admin,
            },
            {
              label: 'Class Assistant/Hallway Monitor',
              value: 'assistantMentor',
              checked: this.state.assistantMentor,
            },
            {
              label: 'Kitchen Staff',
              value: 'kitchen',
              checked: this.state.kitchen,
            },
            {
              label: 'Other',
              value: 'showOther',
              checked: this.state.showOther,
            },
          ]}
          id="role"
          label="I am interested in volunteering in the role of:"
          onChange={this.onChangeInput}
        />
        <br />

        {this.state.showOther && (
          <Textbox
            id="otherText"
            label="Other Role"
            onChange={this.onChangeInput}
            size={1 * widthBase}
            value={this.state.otherText}
          />
        )}
        <Checklist
          checklistItems={[
            {
              label: 'Sunday School',
              value: 'sundaySchool',
              checked: this.state.sundaySchool,
            },
            {
              label: 'Vacation Bible School',
              value: 'bibleSchool',
              checked: this.state.bibleSchool,
            },
            {
              label: 'Youth Ministory',
              value: 'youthMinistry',
              checked: this.state.youthMinistry,
            },
          ]}
          id="past-volunteer-area"
          label="Select areas that you have volunteered for at City Temple in the past"
          onChange={this.onChangeInput}
        />
        <Checklist
          checklistItems={[
            {
              label: 'Teacher',
              value: 'pastTeacher',
              checked: this.state.pastTeacher,
            },
            {
              label: 'Administrative Staff',
              value: 'pastAdmin',
              checked: this.state.pastAdmin,
            },
            {
              label: 'Transition Team',
              value: 'pastTransition',
              checked: this.state.pastTransition,
            },
            {
              label: 'Kitchen Staff',
              value: 'pastKitchen',
              checked: this.state.pastKitchen,
            },
            {
              label: 'Chaperon',
              value: 'pastChaperone',
              checked: this.state.pastChaperone,
            },
          ]}
          id="past-volunteer-role"
          label="Your role:"
          onChange={this.onChangeInput}
        />
        <br />

        {this.props.askAvailability && (
          <div>
            <Checklist
              checklistItems={[
                {
                  label: 'M',
                  value: 'monday',
                  checked: this.state.monday,
                },
                {
                  label: 'T',
                  value: 'tuesday',
                  checked: this.state.tuesday,
                },
                {
                  label: 'W',
                  value: 'wednesday',
                  checked: this.state.wednesday,
                },
                {
                  label: 'Th',
                  value: 'thursday',
                  checked: this.state.thursday,
                },
                {
                  label: 'F',
                  value: 'friday',
                  checked: this.state.friday,
                },
              ]}
              horizontal
              id="available-day"
              label="Availability:"
              onChange={this.onChangeInput}
            />

            <br />
          </div>
        )}
        {this.state.email && (
          <Checkbox
            checked={this.state.subscribe}
            className="registration-checkbox"
            id="subscribe"
            label="Send emails about exciting events going on in the Temple!"
            onChange={this.onChangeInput}
            value="subscribe"
          />
        )}
        <DisclaimerCheckbox
          checked={this.state[FIELDS_INFO.agreementChecked.fieldId]}
          id={FIELDS_INFO.agreementChecked.fieldId}
          onChange={this.onChangeInput}
        />

        <Button onClick={this.validateAndSubmit}>Submit</Button>
      </div>
    );
  }

  makeSubGroup(id, fieldIds, header) {
    const items = fieldIds.reduce((items, fieldId) => {
      if (this.state[fieldId]) {
        items.push(
          <li key={fieldId}>
            <span>{FIELDS_INFO[fieldId].label}</span>
          </li>,
        );
      }
      return items;
    }, []);

    // add the otherText data in the summary with the roles
    const fieldId = 'otherText';
    if (id === 'roles' && this.state[fieldId]) {
      items.push(
        <li key={fieldId}>
          <span>{this.state[fieldId]}</span>
        </li>,
      );
    }

    return (
      Boolean(items.length) && (
        <div className="check-list-summary" key={id}>
          <br />
          {header}
          {items}
        </div>
      )
    );
  }

  renderSummaryModal() {
    let fieldSummaryItems = Object.values(FIELDS_INFO).reduce(
      (items, field) => {
        const {fieldId, label} = field;

        // do not add term agreement to confirmation modal
        if (fieldId === FIELDS_INFO.agreementChecked.fieldId) {
          return items;
        }

        const value = this.state[fieldId];

        // make sure otherText doesn't show up with the other text fields
        if (value && typeof value === 'string' && fieldId !== 'otherText') {
          items.push(
            <li key={fieldId}>
              <span className="bold">{label}</span>: {value}
            </li>,
          );
        }

        return items;
      },
      [],
    );

    const groupFields = {
      roles: ['teacher', 'admin', 'assistantMentor', 'kitchen'],
      pastGroups: ['sundaySchool', 'bibleSchool', 'youthMinistry'],
      pastRoles: [
        'pastTeacher',
        'pastAdmin',
        'pastTransition',
        'pastKitchen',
        'pastChaperone',
      ],
      availability: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    };

    fieldSummaryItems = fieldSummaryItems.concat(
      this.makeSubGroup('roles', groupFields.roles, 'Roles volunteering for:'),
      this.makeSubGroup(
        'pastGroups',
        groupFields.pastGroups,
        'Areas volunteered for in the past:',
      ),
      this.makeSubGroup(
        'pastRoles',
        groupFields.pastRoles,
        'Roles volunteered for in the past:',
      ),
      this.makeSubGroup(
        'available-days',
        groupFields.availability,
        'Available Days',
      ),
    );

    return (
      <Modal className="registration-modal" onCloseClick={this.toggleModal}>
        <h2>Please take a moment to confirm your data</h2>
        <ul>{fieldSummaryItems}</ul>
        <Button onClick={this.pushToFirebase}>Confirm</Button>
        <Button onClick={this.toggleModal}>Edit</Button>
      </Modal>
    );
  }

  render() {
    const {redirect, postStatus, errors, responseError, showModal} = this.state;

    if (redirect) {
      const state = {forMessage: 'you for registering.'};

      return (
        <Redirect
          push
          to={{
            pathname: routePaths.CE_THANK_YOU,
            state,
          }}
        />
      );
    }

    const hasErrors = Boolean(errors.length);

    const formFields = this.renderFormFields();
    const modal =
      showModal && postStatus !== 'failure' && this.renderSummaryModal();

    return (
      <div className={this.props.className}>
        {this.props.headerContent}
        {hasErrors && <ErrorList errors={errors} />}
        {formFields}
        {Boolean(hasErrors || postStatus) && (
          <PostSubmitStatusMessage
            errors={errors}
            postStatus={postStatus}
            responseError={responseError}
          />
        )}
        {modal}
      </div>
    );
  }
}

BaseRegistrationVolunteer.defaultProps = {
  askAvailability: false,
};

BaseRegistrationVolunteer.propTypes = {
  askAvailability: PropTypes.bool,
  className: PropTypes.string,
  headerContent: PropTypes.node,
  refName: PropTypes.string.isRequired,
  volunteerIdPropName: PropTypes.string.isRequired,
};

export default BaseRegistrationVolunteer;
