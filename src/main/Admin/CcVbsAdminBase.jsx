import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import firebase from '../../firebase';
import commonUtils from '../../utils/commonUtils';
import {CHILD_STATUS} from '../CcVbsCheckinOut/BaseCheckinOutConstants';
import Select from '../commonComponents/Select';
import Table from '../commonComponents/Table/Table';

class CcVbsAdminBase extends Component {
  static propTypes = {
    // show mon-fri property values from volunteer data
    showAvailability: PropTypes.bool,
    stringPrefix: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      studentTableRows: [],
      volunteerTableRows: [],
      dataYear: '2021',
    };

    this.getInfoFromFirebase();
  }

  componentDidUpdate(prevProps, prevState) {
    const yearChanged = prevState.dataYear !== this.state.dataYear;
    const pageChanged = prevProps.stringPrefix !== this.props.stringPrefix;
    if (yearChanged || pageChanged) {
      this.getInfoFromFirebase();
    }
  }

  getInfoFromFirebase() {
    this.convertFbObjectToState(
      'volunteers',
      'volunteerTableRows',
      this.generateVolunteerRowObject,
    );

    this.convertFbObjectToState(
      'students',
      'studentTableRows',
      this.generateChildRowObject,
    );

    this.convertFbObjectWithSubObjectsToState(
      `${this.props.stringPrefix}Logbook`,
      'checkinTableRows',
      this.generateCheckinRowObject,
      true,
    );
  }

  convertFbObjectToState(type, stateName, generateRowObject) {
    let registerTypeString;
    if (type === 'volunteers') {
      registerTypeString = 'Volunteers';
    } else if (type === 'students') {
      registerTypeString = 'Students';
    }

    if (!registerTypeString) {
      throw new Error('invalid type provided');
    }

    const refPath = `${this.props.stringPrefix}Registered${registerTypeString}/${this.state.dataYear}`;

    firebase
      .database()
      .ref(refPath)
      .on('value', (snapshot) => {
        const tableRows = this.getRowsFromSnapshot(
          snapshot,
          generateRowObject,
          this,
        );
        this.setState({[stateName]: tableRows});
      });
  }

  convertFbObjectWithSubObjectsToState(refPath, stateName, generateRowObject) {
    firebase
      .database()
      .ref(refPath)
      .on('value', (snapshot) => {
        const props = {};

        snapshot.forEach((snapshotItem) => {
          const key = `${stateName}-${snapshotItem.key}`;
          const tableRows = this.getRowsFromSnapshot(
            snapshotItem,
            generateRowObject,
            this,
          );

          props[key] = tableRows;
        });

        this.setState(props);
      });
  }

  getRowsFromSnapshot(snapshot, generateRowObject, instance) {
    const tableRows = [];
    snapshot.forEach((snapshotItem) => {
      const object = snapshotItem.val();
      tableRows.push(
        generateRowObject.bind(instance)(snapshotItem.key, object),
      );
    });

    return tableRows;
  }

  makeString(keysAndLabels, volunteerObject) {
    return keysAndLabels
      .reduce((strings, [key, label]) => {
        if (volunteerObject[key]) {
          strings.push(label);
        }
        return strings;
      }, [])
      .join(', ');
  }

  generateInterestedInString(volunteerObject) {
    const keysAndLabels = [
      ['teacher', 'Teacher'],
      ['admin', 'Administrative Staff'],
      ['assistantMentor', 'Assistant/Hallway Monitor'],
      ['kitchen', 'Kitchen Staff'],
      ['otherText'],
    ];

    return this.makeString(keysAndLabels, volunteerObject);
  }

  generatePastAreaString(volunteerObject) {
    const keysAndLabels = [
      ['bibleSchool', 'Bible School'],
      ['sundaySchool', 'Sunday School'],
      ['youthMinistry', 'Youth Ministry'],
    ];

    return this.makeString(keysAndLabels, volunteerObject);
  }

  generatePastRolesString(volunteerObject) {
    const keysAndLabels = [
      ['pastTeacher', 'Teacher'],
      ['pastAdmin', 'Administrative Staff'],
      ['pastTransition', 'Transition Team'],
      ['pastKitchen', 'Kitchen Staff'],
      ['pastChaperone', 'Chaperone'],
    ];

    return this.makeString(keysAndLabels, volunteerObject);
  }

  getDaysAvailableString(volunteerObject) {
    const days = [
      {key: 'monday', short: 'M'},
      {key: 'tuesday', short: 'T'},
      {key: 'wednesday', short: 'W'},
      {key: 'thursday', short: 'TH'},
      {key: 'friday', short: 'F'},
    ];

    return days.reduce((daysString, day) => {
      if (volunteerObject[day.key]) {
        if (daysString) {
          daysString += '-';
        }
        daysString += day.short;
      }

      return daysString;
    }, '');
  }

  generateVolunteerRowObject(key, volunteerObject) {
    const {
      homePhone,
      mobilePhone,
      email,
      address1,
      address2,
      city,
      state,
      zip,
    } = volunteerObject;

    return {
      id: key,
      name: volunteerObject.name,
      homePhone: commonUtils.formatPhoneNumber(homePhone, true),
      mobilePhone: commonUtils.formatPhoneNumber(mobilePhone, true),
      email,
      address: (
        <div>
          {address1}
          {Boolean(address2) && <div>{address2}</div>}
          <div>{`${city}, ${state} ${zip}`}</div>
        </div>
      ),
      availability: this.getDaysAvailableString(volunteerObject),
      interestedIn: this.generateInterestedInString(volunteerObject),
      pastAreas: this.generatePastAreaString(volunteerObject),
      pastRoles: this.generatePastRolesString(volunteerObject),
      dob: volunteerObject.dob,
      updateTime: commonUtils.formatTime(volunteerObject.timeChanged),
    };
  }

  getVolunteerTableColumns() {
    const firstGroup = [
      {label: 'Name', name: 'name'},
      {label: 'Home Phone', name: 'homePhone'},
      {label: 'Mobile Phone', name: 'mobilePhone'},
      {label: 'Email', name: 'email'},
      {label: 'Address', name: 'address'},
    ];

    const availability = {label: 'Availability', name: 'availability'};

    const lastGroup = [
      {label: 'Interested In', name: 'interestedIn'},
      {label: 'Past Areas', name: 'pastAreas'},
      {label: 'Past Roles', name: 'pastRoles'},
      {label: 'Update Time', name: 'updateTime'},
      {label: 'DOB', name: 'dob'},
    ];

    const allColumns = firstGroup;

    if (this.props.showAvailability) {
      allColumns.push(availability);
    }

    allColumns.push(...lastGroup);

    return allColumns;
  }

  generateChildRowObject(key, childObject) {
    const {
      address1,
      address2,
      childDob,
      city,
      knownAllergies,
      email,
      parentNames,
      phone,
      state,
      studentName,
      subscribe,
      registerTime,
      type,
      zip,
    } = childObject;

    const isChild = type === 'CHILD';
    const rowData = {
      id: key,
      studentName,
      type: 'Child',
      phone: commonUtils.formatPhoneNumber(phone, true),
      email: email,
      parentNames: parentNames?.join(' & '),
      address: (
        <div>
          {address1}
          {Boolean(address2) && <div>{address2}</div>}
          <div>{`${city}, ${state} ${zip}`}</div>
        </div>
      ),
      allergies: knownAllergies,
      subscribed: subscribe ? 'Yes' : 'No',
      age: commonUtils.getAge(childDob),
      registerTime: commonUtils.formatTime(registerTime),
    };

    if (!isChild) {
      rowData.parentNames = 'N/A';
      rowData.age = 'N/A';
      rowData.type = 'Adult';
    }

    return rowData;
  }

  getChildrenTableColumns() {
    return [
      {label: 'Student Name', name: 'studentName'},
      {label: 'Parent Names', name: 'parentNames'},
      {label: 'Phone', name: 'phone'},
      {label: 'Email', name: 'email'},
      {label: 'Address', name: 'address'},
      {label: 'Known Allergies', name: 'allergies'},
      {label: 'Subscribed', name: 'subscribed'},
      {label: 'Age', name: 'age'},
      {label: 'Registered Time', name: 'registerTime'},
    ];
  }

  generateCheckinRowObject(key, checkinObject) {
    return {
      id: key,
      childName: checkinObject.childName,
      status:
        checkinObject.status === CHILD_STATUS.CHECKED_IN
          ? 'Checked In'
          : 'Checked Out',
      parentName: checkinObject.parentName,
      age: commonUtils.getAge(checkinObject.childDob),
      allergies: checkinObject.knownAllergies,
      parentEmail: checkinObject.parentEmail,
      parentPhone: commonUtils.formatPhoneNumber(
        checkinObject.parentPhone,
        true,
      ),
      checkInTime: commonUtils.formatTime(checkinObject.checkInTime),
      checkOutTime: commonUtils.formatTime(checkinObject.checkOutTime),
    };
  }

  getCheckinTableColumns() {
    return [
      {label: 'Child Name', name: 'childName'},
      {label: 'Parent Name', name: 'parentName'},
      {label: 'Age', name: 'age'},
      {label: 'Allergies', name: 'allergies'},
      {label: 'Parent Email', name: 'parentEmail'},
      {label: 'Parent Phone', name: 'parentPhone'},
      {label: 'Status', name: 'status'},
      {label: 'Check In Time', name: 'checkInTime'},
      {label: 'Check Out Time', name: 'checkOutTime'},
    ];
  }

  getSignInDates() {
    return Object.keys(this.state).reduce((signinDates, stateName) => {
      if (stateName.includes('checkinTableRows')) {
        const date = this.getDateFromStateName(stateName);
        signinDates.push(date);
      }

      return signinDates;
    }, []);
  }

  getDateFromStateName(stateName) {
    return stateName.replace('checkinTableRows-', '');
  }

  getStateFromDateName(date) {
    return `checkinTableRows-${date}`;
  }

  yearSelectDropdown() {
    const options = ['2017', '2018', '2019', '2021'].map((year) => {
      return {
        label: year,
        value: year,
      };
    });

    return (
      <Select
        label="Select Data Year"
        onChange={(value) => {
          this.setState({dataYear: value});
        }}
        options={options}
        value={this.state.dataYear}
      />
    );
  }

  daySelectDropdown(dates, selectedDate) {
    const options = dates.map((date) => {
      return {
        label: commonUtils.formatDate(date),
        value: date,
      };
    });

    return (
      <Select
        label="Select Sign In Date"
        onChange={(value) => {
          this.setState({currentSigninDate: value});
        }}
        options={options}
        value={selectedDate}
      />
    );
  }

  renderSigninTableAndSelect(signinDates) {
    const {currentSigninDate} = this.state;

    const dateForTable =
      currentSigninDate || signinDates[signinDates.length - 1];
    const stateForTable = this.getStateFromDateName(dateForTable);

    return (
      <div>
        <h2>Sign In</h2>
        {this.daySelectDropdown(signinDates, dateForTable)}
        <Table
          columns={this.getCheckinTableColumns()}
          rows={this.state[stateForTable] || []}
        />
      </div>
    );
  }

  render() {
    const {studentTableRows, volunteerTableRows} = this.state;
    const signinDates = this.getSignInDates();

    return (
      <div>
        {this.yearSelectDropdown()}
        <h2>Volunteers</h2>
        <Table
          columns={this.getVolunteerTableColumns()}
          rows={volunteerTableRows}
        />
        <h2>Children</h2>
        <Table
          columns={this.getChildrenTableColumns()}
          rows={studentTableRows}
        />
        <h3>Sign in and out Records</h3>
        {signinDates.length ? (
          this.renderSigninTableAndSelect(signinDates)
        ) : (
          <p>No Records To List</p>
        )}
      </div>
    );
  }
}

export default withRouter(CcVbsAdminBase);
