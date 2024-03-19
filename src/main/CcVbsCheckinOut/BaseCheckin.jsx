import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import firebase, {auth, provider} from '../../firebase';
import utils from '../../utils/commonUtils';
import Button from '../commonComponents/Button/Button';
import Checklist from '../commonComponents/Checklist/Checklist';
import Textbox from '../commonComponents/Textbox';

import {CHILD_STATUS, PAGE_STATUS} from './BaseCheckinOutConstants';

import './BaseCheckinOut.css';

class BaseCheckin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registered: [],
      regStaff: {},
      parentName: '',
      status: PAGE_STATUS.ENTERING_PARENT_NAME,
      user: null,
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.startSearchAgain = this.startSearchAgain.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheckInClick = this.onCheckInClick.bind(this);
    this.onChecklistChange = this.onChecklistChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSelectAllClick = this.onSelectAllClick.bind(this);
  }

  componentDidMount() {
    // update registered state based on firebase data status
    const registeredRef = firebase
      .database()
      .ref(this.props.registeredChildrenRefName);

    registeredRef.on('value', (snapshot) => {
      const registered = snapshot.val();
      this.setState({registered});
    });

    // update regStaff state based on firebase data status
    const regStaffRef = firebase
      .database()
      .ref(this.props.registryAccessRefName);

    regStaffRef.on('value', (snapshot) => {
      const regStaff = snapshot.val();
      this.setState({regStaff});
    });

    const todaysLogRef = this.getTodaysLogRef();

    todaysLogRef.on('value', (snapshot) => {
      const checkedinIds = _.map(snapshot.val(), this.props.registryIdName);
      this.setState({checkedinIds});
    });

    // keeps user logged in on a page refresh
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
  }

  onChecklistChange(value, id) {
    const {childrenOfParent} = this.state;
    const newChildrenOfParent = _.cloneDeep(childrenOfParent);
    const child = newChildrenOfParent[id];
    child.checked = value;
    this.setState({childrenOfParent: newChildrenOfParent});
  }

  onSelectAllClick() {
    const newChildrenOfParent = _.cloneDeep(this.state.childrenOfParent);

    _.forEach(newChildrenOfParent, (child) => {
      child.checked = true;
    });

    this.setState({childrenOfParent: newChildrenOfParent});
  }

  getTodaysLogRef() {
    const today = moment().format('YYYY-MM-DD');
    return firebase.database().ref(`${this.props.logbookRefName}/${today}`);
  }

  onCheckInClick(disabled) {
    if (disabled) {
      window.alert('You must select at least one child');
    } else {
      const children = this.getSelectedChildren();
      const todaysLogRef = this.getTodaysLogRef();

      _.forEach(children, (child) => {
        const uploadChild = _.cloneDeep(child);
        uploadChild[`${this.props.logbookRefName}Id`] = utils.generatePushID();
        uploadChild.checkInTime = new Date().toISOString();
        uploadChild.status = CHILD_STATUS.CHECKED_IN;

        delete uploadChild.checked;

        // IMPROVEMENTS: check for return from push
        todaysLogRef.push(uploadChild);
      });
      this.setState({status: PAGE_STATUS.CHILDREN_CHECKED_IN});
    }
  }

  onChange(value, id) {
    this.setState({[id]: value});
  }

  onSearch() {
    const childrenOfParent = {};

    _.forEach(_.cloneDeep(this.state.registered), (child) => {
      if (_.includes(child.parentNames, this.state.parentName)) {
        childrenOfParent[child[this.props.registryIdName]] = child;
      }
    });

    this.setState({
      status: PAGE_STATUS.SELECT_CHILDREN,
      childrenOfParent,
    });
  }

  handleLoginClick() {
    auth.signInWithPopup(provider).then((result) => {
      const {user} = result;
      this.setState({user});
    });
  }

  startSearchAgain() {
    this.setState({parentName: '', status: PAGE_STATUS.ENTERING_PARENT_NAME});
  }

  listChildren() {
    const {childrenOfParent, checkedinIds} = this.state;

    const checkListItems = _.map(childrenOfParent, (child) => {
      const {childDob, childName} = child;
      const registeredId = child[this.props.registryIdName];
      const checkedIn = _.includes(checkedinIds, registeredId);

      let checked = Boolean(childrenOfParent[registeredId].checked);
      let disabled = false;
      let label = `${childName}, age ${utils.getAge(childDob)}`;

      if (checkedIn) {
        checked = true;
        disabled = true;
        label += ' (already checked in)';
      }

      return {
        checked,
        disabled,
        label,
        value: registeredId,
      };
    });

    return (
      <div>
        <Checklist
          checklistItems={checkListItems}
          id="children-checklist"
          label="Select Child"
          onChange={this.onChecklistChange}
          required
        />
      </div>
    );
  }

  getSelectedChildren() {
    return _.filter(this.state.childrenOfParent, (child) => child.checked);
  }

  renderChildSelectDiv() {
    const {childrenOfParent, parentName, checkedinIds} = this.state;
    let checkInButtonClass = 'check-in-button';
    let disabled = false;
    const atLeastOneChildSelected = this.getSelectedChildren().length;

    if (!atLeastOneChildSelected) {
      checkInButtonClass += ' disabled';
      disabled = true;
    }

    if (_.isEmpty(childrenOfParent)) {
      return (
        <div>
          No children found for name “{parentName}”. Please try a different name
          or get staff assistance.
          <div className="button-div">
            <Button
              className="select-all-button"
              onClick={this.startSearchAgain}
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    const childrenOfParentThatAreNotCheckedIn = _.filter(
      childrenOfParent,
      (child) => !_.includes(checkedinIds, child[this.props.registryIdName]),
    );

    if (!childrenOfParentThatAreNotCheckedIn.length) {
      return (
        <div>
          <p>All of the children for this name are checked in already</p>
          {this.listChildren()}
          <div className="button-div">
            <Button
              className="select-all-button"
              onClick={this.startSearchAgain}
            >
              Go Back To Search
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p className="who-checking">Who are you checking in today?</p>
        <div className="instructions">
          You can select names individually or press{' '}
          <span className="select-all-text">Select All</span> to select every
          one listed below
        </div>
        {this.listChildren()}
        <div className="button-div">
          <Button className="select-all-button" onClick={this.onSelectAllClick}>
            Select All
          </Button>
        </div>
        <div className="button-div">
          <Button
            className={checkInButtonClass}
            onClick={_.partial(this.onCheckInClick, disabled)}
          >
            Check In
          </Button>
        </div>
      </div>
    );
  }

  renderNameInput() {
    return (
      <div>
        <Textbox
          id="parentName"
          instructions="If you are registered, please enter parent/guardian’s name below to check children in"
          label="Parent/Guardian Name"
          onChange={this.onChange}
          onEnter={this.onSearch}
          placeholder="First Last"
          value={this.state.parentName}
        />

        <p>
          If your children are not registered. Please click the link below to
          register.
        </p>
        <Link to={this.props.registerLink}>Child Registration</Link>
      </div>
    );
  }

  renderWhileLoggedIn() {
    const {status} = this.state;

    return (
      <div>
        <h1>Welcome Back to {this.props.welcomeName}</h1>
        {status === PAGE_STATUS.ENTERING_PARENT_NAME && this.renderNameInput()}
        {status === PAGE_STATUS.SELECT_CHILDREN && this.renderChildSelectDiv()}
        <div className="logged-in-name">
          Logged in under {this.state.user.displayName}{' '}
          <Button
            onClick={() => {
              auth.signOut().then(() => {
                this.setState({user: null});
              });
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
    );
  }

  renderLoginScreen(loggedIn) {
    return (
      <div>
        {loggedIn ? (
          <div>
            <h1>Insufficient Access</h1>You must log in as a member of the
            Children’s Church Staff
          </div>
        ) : (
          <div>
            <h1>Please Login</h1>A Staff Member Must Log In Order To Enable
            Registration
          </div>
        )}
        <div className="admin-page">
          <Button onClick={this.handleLoginClick}>Log in</Button>
        </div>
      </div>
    );
  }

  renderAfterLoginScreen() {
    return (
      <div>
        <h1>Thanks for checking your child in!</h1>
        <Button onClick={this.startSearchAgain}>Check Another Child In</Button>
      </div>
    );
  }

  renderProperScreen() {
    const {regStaff, user, status} = this.state;

    const memberOfBaseCheckinGroup = user && regStaff[user.uid];

    if (status === PAGE_STATUS.CHILDREN_CHECKED_IN) {
      return this.renderAfterLoginScreen();
    }

    if (user && memberOfBaseCheckinGroup) {
      return this.renderWhileLoggedIn(user);
    }

    return this.renderLoginScreen();
  }

  render() {
    return <div className="check-in-out-page">{this.renderProperScreen()}</div>;
  }
}

BaseCheckin.propTypes = {
  logbookRefName: PropTypes.string.isRequired,
  registerLink: PropTypes.string.isRequired,
  registeredChildrenRefName: PropTypes.string.isRequired,
  registryAccessRefName: PropTypes.string.isRequired,
  registryIdName: PropTypes.string.isRequired,
  welcomeName: PropTypes.string.isRequired,
};

export default BaseCheckin;
