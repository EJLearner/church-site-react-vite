import React from 'react';

import firebase from '../../firebase';
import commonUtils from '../../utils/commonUtils';
import Table from '../commonComponents/Table/Table';

const getColumns = () => {
  return [
    {name: 'name', label: 'Name'},
    {name: 'email', label: 'Email Address'},
    {name: 'subscribeSource', label: 'Subscribe Source'},
    {name: 'formattedSubscribeTime', label: 'Subscribe Time'},
  ];
};

const getRows = (subscribedEmails) => {
  return Object.values(subscribedEmails).map(
    ({email, name, subscribeSource, subscribeTime}) => {
      return {
        id: email,
        name,
        email,
        subscribeSource,
        formattedSubscribeTime: commonUtils.formatTime(subscribeTime),
      };
    },
  );
};

class SubscribedEmailsAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      subscribedEmails: {},
    };
  }

  componentDidMount() {
    // FBH get a reference for the 'subscribedEmails' top level prop of the data
    const subscribedEmailsRef = firebase.database().ref('subscribedEmails');

    // FBH add a listener to the subscribedEmails object, update on value change (guessing)
    // listener gets the subscribedEmails object using snapshot.val();
    // then pushes the updated subScribedEmails object into the state
    subscribedEmailsRef.on('value', (snapshot) => {
      const subscribedEmails = snapshot.val() || {};

      this.setState({
        subscribedEmails,
      });
    });
  }

  render() {
    return (
      <>
        <h2>Subscribed Emails</h2>

        <Table
          columns={getColumns()}
          rows={getRows(this.state.subscribedEmails)}
        />
      </>
    );
  }
}

export default SubscribedEmailsAdmin;
