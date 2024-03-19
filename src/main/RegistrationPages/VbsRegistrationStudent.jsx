import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Redirect} from 'react-router';

import firebase from '../../firebase';
import routePaths from '../../routePaths';
import {
  saveRegistrationData,
  getRegistrationData,
  resetRegistrationData,
} from '../../stores/lastSubmittedRegistration';
import utils from '../../utils/commonUtils';
import constants from '../../utils/constants';
import pushToSubscribedList from '../../utils/pushToSubscribedList';
import Button from '../commonComponents/Button/Button';
import Checkbox from '../commonComponents/Checklist/Checkbox';
import ErrorList from '../commonComponents/ErrorList';
import Modal from '../commonComponents/Modal/Modal';
import PostSubmitStatusMessage from '../commonComponents/PostSubmitStatusMessage';
import Textarea from '../commonComponents/Textarea';
import Textbox from '../commonComponents/Textbox';

import DisclaimerCheckbox from './DisclaimerCheckbox';
import fieldValidators from './fieldValidators';
import registrationUtils from './registrationUtils';

import './Registration.css';

const WIDTH_BASE = 15;
const USE_TEST_DATA = false;

const STUDENT_TYPES = {
  CHILD: 'CHILD',
  ADULT: 'ADULT',
};

const agreementCheckedId = 'agreement-checked';

class VbsRegistrationStudent extends Component {
  static propTypes = {
    studentType: PropTypes.oneOf(Object.values(STUDENT_TYPES)),
  };

  state = this.initialState;

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.postStatus && this.state.postStatus) {
      const successBox = document.getElementById('success-error-box');
      successBox.focus();
    }
  }

  get fieldsInfo() {
    const fieldObject = {
      studentName: {
        fieldId: 'studentName',
        label: 'Student’s name',
        fieldRules: [
          fieldValidators.isNotEmpty,
          fieldValidators.isAtLeastTwoCharacters,
        ],
      },

      childDob: {
        fieldId: 'childDob',
        label: 'Child’s Date of Birth',
        fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isDate],
      },

      email: {
        fieldId: 'email',
        label: 'Email Address',
        fieldRules: [fieldValidators.isValidEmail],
      },
      parentName: {
        fieldId: 'parentName',
        label: 'Parent’s Name',
        fieldRules: [
          fieldValidators.isNotEmpty,
          fieldValidators.isAtLeastTwoCharacters,
        ],
      },
      phone: {
        fieldId: 'phone',
        label: 'Phone Number',
        fieldRules: [fieldValidators.isPhoneNumber, fieldValidators.isNotEmpty],
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
      subscribe: {
        fieldId: 'subscribe',
        default: false,
        label: 'Subscribe',
      },
      knownAllergies: {
        fieldId: 'knownAllergies',
        label: 'Known Allergies',
        fieldRules: [fieldValidators.isNotEmpty],
      },
      agreementChecked: {
        fieldId: agreementCheckedId,
        label: 'Terms Agreement Checkbox',
        fieldRules: [fieldValidators.disclaimerIsChecked],
        showInConfirmation: false,
      },
    };
    if (this.props.studentType === STUDENT_TYPES.ADULT) {
      delete fieldObject.parentName;
      delete fieldObject.childDob;
    }

    return fieldObject;
  }

  get initialState() {
    const registrationData = getRegistrationData(true) || {};
    resetRegistrationData();

    const testData = {
      studentName: 'Delete Me',
      childDob: '01/01/2000',
      email: '',
      parentName: 'Test Parent',
      phone: '000-000-0000',
      address1: '0000 Test Address',
      address2: 'Test Floor',
      city: 'Apalooza',
      state: 'MD',
      zip: '00000',
      subscribe: true,
      knownAllergies: 'Things I am allergic to',
    };

    const fieldStates = {};

    // setting values for field states
    Object.values(this.fieldsInfo).forEach((fieldData) => {
      const {fieldId} = fieldData;
      let value = registrationData[fieldId] || '';

      if (value === '' && fieldData.default !== undefined) {
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
      [agreementCheckedId]: false,
    };
  }

  onChangeInput = (value, id) => {
    this.setState({[id]: value, postStatus: undefined});
  };

  pushToFirebase(studentType) {
    const vbsYear = utils.getVbsDbYear();
    const studentIdPropName = constants.VBS_REGISTERED_STUDENT_ID_PROP;
    const refName = `${constants.VBS_REGISTERED_STUDENT_REF_NAME}/${vbsYear}`;
    const {childDob, subscribe, email, parentName, studentName} = this.state;

    const student = {
      [studentIdPropName]: utils.generatePushID(),
      registerTime: new Date().toISOString(),
    };

    Object.values(this.fieldsInfo).forEach(({fieldId}) => {
      student[fieldId] = this.state[fieldId];
    });

    student.type = studentType;

    let regAnotherStudentPath;
    let emailSubscribeName;
    if (studentType === STUDENT_TYPES.CHILD) {
      const standardChildDob = moment(
        childDob,
        constants.VALID_INPUT_DATE_FORMATS,
      ).format(constants.INTERNAL_DATE_FORMAT);

      student.childDob = standardChildDob;
      student.parentNames = [parentName];

      regAnotherStudentPath = routePaths.CE_VBS_REG_CHILD;
      emailSubscribeName = parentName;
    } else {
      delete student.childDob;
      delete student.parentName;

      regAnotherStudentPath = routePaths.CE_VBS_REG_ADULT;
      emailSubscribeName = studentName;
    }

    const firebaseRef = firebase.database().ref(refName);

    firebaseRef
      .push(student)
      .then(() => {
        saveRegistrationData(student, regAnotherStudentPath);
        this.setState({redirect: true});
      })
      .catch((responseError) => {
        this.setState({postStatus: 'failure', responseError});
      });

    if (subscribe && email) {
      pushToSubscribedList(
        email,
        'VBS Student Registration',
        emailSubscribeName,
      );
    }
  }

  onSubmitClick() {
    const errors = registrationUtils.getPageErrors(
      this.state,
      Object.values(this.fieldsInfo),
    );

    this.setState({
      postStatus: undefined,
      showModal: !errors.length,
      errors,
    });
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  renderHeaderContent() {
    return (
      <div>
        <h1 className="vbs-header">Vacation Bible School</h1>
        <h2 className="vbs-header">Student Registration</h2>
        <p>
          Complete the following form to register for Vacation Bible School. For
          timely enrollment, please double-check your responses before clicking
          the <span className="bold">Submit</span> button.
        </p>
      </div>
    );
  }

  renderChildNameInput() {
    return (
      <Textbox
        id="childDob"
        label="Child’s Date of Birth"
        onChange={(value, id) => this.onChangeInput(value, id)}
        placeholder="mm/dd/yyyy"
        required
        size={1 * WIDTH_BASE}
        value={this.state.childDob}
      />
    );
  }

  renderParentNameInput() {
    return (
      <Textbox
        id="parentName"
        label="Parent Name"
        onChange={(value, id) => this.onChangeInput(value, id)}
        required
        size={2 * WIDTH_BASE}
        value={this.state.parentName}
      />
    );
  }

  renderFormFields() {
    const isChild = this.props.studentType === STUDENT_TYPES.CHILD;
    return (
      <div id="form-fields">
        <Textbox
          id="studentName"
          label="Student’s Name"
          onChange={(value, id) => this.onChangeInput(value, id)}
          required
          size={2 * WIDTH_BASE}
          value={this.state.studentName}
        />
        {isChild && (
          <>
            {this.renderChildNameInput()}
            <h3>Parent/Guardian Information</h3>
          </>
        )}
        <Textbox
          id="email"
          label="Email Address"
          onChange={(value, id) => this.onChangeInput(value, id)}
          size={2 * WIDTH_BASE}
          value={this.state.email}
        />
        {isChild && (
          <>
            <br />
            {this.renderParentNameInput()}
          </>
        )}
        <Textbox
          id="phone"
          label="Best Phone Number to Reach You"
          onChange={(value, id) => this.onChangeInput(value, id)}
          required
          size={1 * WIDTH_BASE}
          value={this.state.phone}
        />
        <br />
        <Textbox
          id="address1"
          label="Address Line 1"
          onChange={(value, id) => this.onChangeInput(value, id)}
          required
          size={4 * WIDTH_BASE}
          value={this.state.address1}
        />
        <br />
        <Textbox
          id="address2"
          label="Address Line 2"
          onChange={(value, id) => this.onChangeInput(value, id)}
          size={4 * WIDTH_BASE}
          value={this.state.address2}
        />
        <br />
        <Textbox
          id="city"
          label="City"
          onChange={(value, id) => this.onChangeInput(value, id)}
          required
          size={1.5 * WIDTH_BASE}
          value={this.state.city}
        />
        <Textbox
          id="state"
          label="State"
          onChange={(value, id) => this.onChangeInput(value, id)}
          required
          size={1.5 * WIDTH_BASE}
          value={this.state.state}
        />
        <br />
        <Textbox
          id="zip"
          label="ZIP Code"
          onChange={(value, id) => this.onChangeInput(value, id)}
          required
          size={Math.floor(0.8 * WIDTH_BASE)}
          value={this.state.zip}
        />
        <Checkbox
          checked={this.state.subscribe}
          className="registration-checkbox"
          id="subscribe"
          label="Send emails about exciting events going on in the Temple!"
          onChange={(value, id) => this.onChangeInput(value, id)}
          value="subscribe"
        />
        <br />
        <Textarea
          columns={4 * WIDTH_BASE}
          id="knownAllergies"
          label="List any known food allergies. Mark N/A if none."
          onChange={(value, id) => this.onChangeInput(value, id)}
          required
          size={200}
          value={this.state.knownAllergies}
        />
        <br />
        <DisclaimerCheckbox
          checked={this.state[agreementCheckedId]}
          id={agreementCheckedId}
          onChange={this.onChangeInput}
        />
        <Button onClick={() => this.onSubmitClick()}>Submit</Button>
      </div>
    );
  }

  renderSummaryModal() {
    const {studentType} = this.props;
    const fieldSummaryItems = Object.values(this.fieldsInfo).reduce(
      (items, field) => {
        const {fieldId, label} = field;

        // do not add term agreement to confirmation modal
        if (fieldId === agreementCheckedId) {
          return items;
        }

        let value = this.state[fieldId];
        if (typeof value === 'boolean') {
          value = value ? 'Yes' : 'No';
        }

        if (value) {
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

    return (
      <Modal
        className="registration-modal"
        onCloseClick={() => this.toggleModal()}
      >
        <h2>Please take a moment to confirm your data</h2>
        <ul>{fieldSummaryItems}</ul>
        <Button onClick={() => this.pushToFirebase(studentType)}>
          Confirm
        </Button>
        <Button onClick={() => this.toggleModal()}>Edit</Button>
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

    return (
      <div className="registration-page">
        {this.renderHeaderContent()}
        {hasErrors && <ErrorList errors={errors} />}
        {this.renderFormFields()}
        {Boolean(hasErrors || postStatus) && (
          <PostSubmitStatusMessage
            postStatus={postStatus}
            responseError={responseError}
          />
        )}
        {showModal && postStatus !== 'failure' && this.renderSummaryModal()}
      </div>
    );
  }
}

export {STUDENT_TYPES};
export default VbsRegistrationStudent;
