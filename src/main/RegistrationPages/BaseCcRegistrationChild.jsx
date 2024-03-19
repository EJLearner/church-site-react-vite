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
import Textbox from '../commonComponents/Textbox';

import DisclaimerCheckbox from './DisclaimerCheckbox';
import fieldValidators from './fieldValidators';
import registrationUtils from './registrationUtils';

import './Registration.css';

const WIDTH_BASE = 15;
const USE_TEST_DATA = false;

const FIELDS_INFO = {
  childName: {
    fieldId: 'childName',
    label: 'Child’s name',
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

  parentEmail: {
    fieldId: 'parentEmail',
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
  parentPhone: {
    fieldId: 'parentPhone',
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
    fieldId: 'agreementChecked',
    label: 'Terms Agreement Checkbox',
    fieldRules: [fieldValidators.disclaimerIsChecked],
    showInConfirmation: false,
  },
};

class BaseCcRegistrationChild extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState();

    this.onChangeInput = this.onChangeInput.bind(this);
    this.renderFormFields = this.renderFormFields.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
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
    const registrationData = getRegistrationData(true) || {};
    resetRegistrationData();

    const testData = {
      childName: 'Delete Me',
      childDob: '01/01/2000',
      parentEmail: 'test@email.com',
      parentName: 'Test Parent',
      parentPhone: '000-000-0000',
      address1: '0000 Test Address',
      address2: 'Test Floor',
      city: 'Apalooza',
      state: 'MD',
      zip: '00000',
      subscribe: true,
      knownAllergies: 'Things I am allergic to',
    };

    const fieldStates = {};

    Object.values(FIELDS_INFO).forEach((fieldData) => {
      const {fieldId} = fieldData;
      let value = registrationData[fieldId] || '';

      if (value === '' && fieldData.default !== undefined) {
        value = fieldData.default;
      }

      if (USE_TEST_DATA && testData[fieldId]) {
        value = testData[fieldId];
      }

      fieldStates[fieldId] = value;
    });

    return {
      ...fieldStates,
      errors: [],
      redirect: false,
      showModal: false,
      agreementChecked: false,
    };
  }

  onChangeInput(value, id) {
    this.setState({[id]: value, postStatus: undefined});
  }

  pushToFirebase() {
    const {childIdPropName, refName} = this.props;
    const {childDob, parentName, subscribe, parentEmail} = this.state;

    const child = {
      [childIdPropName]: utils.generatePushID(),
      registerTime: new Date().toISOString(),
      parentNames: [parentName],
    };

    Object.values(FIELDS_INFO).forEach(({fieldId}) => {
      child[fieldId] = this.state[fieldId];
    });

    const standardChildDob = moment(
      childDob,
      constants.VALID_INPUT_DATE_FORMATS,
    ).format(constants.INTERNAL_DATE_FORMAT);

    child.childDob = standardChildDob;

    const firebaseRef = firebase.database().ref(refName);

    firebaseRef
      .push(child)
      .then(() => {
        saveRegistrationData(child, this.props.routePath);
        this.setState({redirect: true});
      })
      .catch((responseError) => {
        this.setState({postStatus: 'failure', responseError});
      });

    if (subscribe && parentEmail) {
      pushToSubscribedList(parentEmail, 'CC Child Registration', parentName);
    }
  }

  onSubmitClick() {
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

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  renderFormFields() {
    return (
      <div id="form-fields">
        <Textbox
          id="childName"
          label="Child’s Name"
          onChange={this.onChangeInput}
          required
          size={2 * WIDTH_BASE}
          value={this.state.childName}
        />
        <Textbox
          id="childDob"
          label="Child’s Date of Birth"
          onChange={this.onChangeInput}
          placeholder="mm/dd/yyyy"
          required
          size={1 * WIDTH_BASE}
          value={this.state.childDob}
        />
        <h3>Parent/Guardian Information</h3>
        <Textbox
          id="parentEmail"
          label="Email Address"
          onChange={this.onChangeInput}
          size={2 * WIDTH_BASE}
          value={this.state.parentEmail}
        />
        <br />
        <Textbox
          id="parentName"
          label="Parent Name"
          onChange={this.onChangeInput}
          required
          size={2 * WIDTH_BASE}
          value={this.state.parentName}
        />
        <Textbox
          id="parentPhone"
          label="Best Phone Number to Reach You"
          onChange={this.onChangeInput}
          required
          size={1 * WIDTH_BASE}
          value={this.state.parentPhone}
        />
        <br />
        <Textbox
          id="address1"
          label="Address Line 1"
          onChange={this.onChangeInput}
          required
          size={4 * WIDTH_BASE}
          value={this.state.address1}
        />
        <br />
        <Textbox
          id="address2"
          label="Address Line 2"
          onChange={this.onChangeInput}
          size={4 * WIDTH_BASE}
          value={this.state.address2}
        />
        <br />
        <Textbox
          id="city"
          label="City"
          onChange={this.onChangeInput}
          required
          size={1.5 * WIDTH_BASE}
          value={this.state.city}
        />
        <Textbox
          id="state"
          label="State"
          onChange={this.onChangeInput}
          required
          size={1.5 * WIDTH_BASE}
          value={this.state.state}
        />
        <br />
        <Textbox
          id="zip"
          label="ZIP Code"
          onChange={this.onChangeInput}
          required
          size={Math.floor(0.8 * WIDTH_BASE)}
          value={this.state.zip}
        />
        <Checkbox
          checked={this.state.subscribe}
          className="registration-checkbox"
          id="subscribe"
          label="Send emails about exciting events going on in the Temple!"
          onChange={this.onChangeInput}
          value="subscribe"
        />
        <br />
        <Textbox
          columns={4 * WIDTH_BASE}
          id="knownAllergies"
          label="List any known food allergies. Mark N/A if none."
          onChange={this.onChangeInput}
          required
          size={200}
          textArea
          value={this.state.knownAllergies}
        />
        <br />
        <DisclaimerCheckbox
          checked={this.state.agreementChecked}
          id="agreementChecked"
          onChange={this.onChangeInput}
        />

        <Button onClick={this.onSubmitClick}>Submit</Button>
      </div>
    );
  }

  renderSummaryModal() {
    const fieldSummaryItems = Object.values(FIELDS_INFO).reduce(
      (items, field) => {
        const {fieldId, label} = field;
        // do not add term agreement to confirmation modal
        if (fieldId === 'agreementChecked') {
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

    const formFields = this.renderFormFields();
    const modal =
      showModal && postStatus !== 'failure' && this.renderSummaryModal();
    const hasErrors = Boolean(errors.length);

    return (
      <div className={this.props.className}>
        {this.props.headerContent}
        {hasErrors && <ErrorList errors={errors} />}
        {formFields}
        {Boolean(hasErrors || postStatus) && (
          <PostSubmitStatusMessage
            postStatus={postStatus}
            responseError={responseError}
          />
        )}
        {modal}
      </div>
    );
  }
}

BaseCcRegistrationChild.propTypes = {
  childIdPropName: PropTypes.string.isRequired,
  className: PropTypes.string,
  headerContent: PropTypes.node,
  refName: PropTypes.string.isRequired,
  routePath: PropTypes.string.isRequired,
};

export default BaseCcRegistrationChild;
