import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import choir from '../../assets/images/choir.jpg';
import firebase, {auth, provider} from '../../firebase';
import routePaths from '../../routePaths';
import Menubar from '../Menubar';
import Button from '../commonComponents/Button/Button';

import CcVbsAdminBase from './CcVbsAdminBase';
import EventAdmin from './EventAdmin';
import SubscribedEmailsAdmin from './SubscribedEmailsAdmin';

const StyledAdminPage = styled.div`
  background-color: var(--light-background);
  color: var(--text-on-light-background);
  padding-bottom: var(--page-bottom-padding);
  min-height: 100%;

  .login-info-and-button {
    margin-bottom: 1em;
  }

  table {
    border-collapse: collapse;
    border: 1px solid black;
    overflow-y: scroll;
  }

  table td,
  table th {
    border: 1px solid black;
    padding: 0.5em;
  }

  .admin-content {
    padding: 1em;
    margin: 0 64px;
  }

  .event-item {
    border: 1px solid black;
    font-family: var(--code);
    margin-top: 1em;
    padding: 0.5em;
  }
`;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      user: null,
      adminUser: null,
    };
  }

  componentDidMount() {
    // update adminUsers state based on firebase data status
    const adminUsersRef = firebase.database().ref('user_groups/admins');

    adminUsersRef.on('value', (snapshot) => {
      const adminUsers = snapshot.val();
      this.setState({adminUsers});
    });

    // keeps user logged in on a page refresh
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
  }

  login() {
    auth.signInWithPopup(provider).then((result) => {
      const {user} = result;
      this.setState({user});
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({user: null});
    });
  }

  generateLinks() {
    const {
      adminUsers,
      ccRegAccess,
      emailSubscribersAccess,
      vbsRegAccess,
      user,
    } = this.state;

    const uid = user?.uid;
    const isAdmin = user && adminUsers?.[uid];

    return [
      {text: 'Home', path: routePaths.MAIN_HOME},
      isAdmin && {path: routePaths.ADMIN_EVENTS, text: 'Events'},
      (isAdmin || ccRegAccess?.[uid]) && {
        path: routePaths.ADMIN_CC,
        text: 'Children’s Church',
      },
      (isAdmin || vbsRegAccess?.[uid]) && {
        path: routePaths.ADMIN_VBS,
        text: 'VBS',
      },
      (isAdmin || emailSubscribersAccess?.[uid]) && {
        path: routePaths.ADMIN_EMAIL_SUBSCRIBERS,
        text: 'Email Subscribers List',
      },
    ].filter(Boolean);
  }

  renderContent() {
    const {user} = this.state;

    if (user) {
      return (
        <div className="admin-page">
          <div className="login-info-and-button">
            Logged in as {user.displayName}{' '}
            <Button onClick={this.logout}>Log out</Button>
          </div>

          <Switch>
            <Route path={routePaths.ADMIN_EVENTS}>
              <EventAdmin />
            </Route>
            <Route path={routePaths.ADMIN_CC}>
              <CcVbsAdminBase stringPrefix="cc" />
            </Route>
            <Route path={routePaths.ADMIN_VBS}>
              <CcVbsAdminBase stringPrefix="vbs" />
            </Route>
            <Route
              component={SubscribedEmailsAdmin}
              path={routePaths.ADMIN_EMAIL_SUBSCRIBERS}
            />
          </Switch>
        </div>
      );
    }

    return (
      <div className="login-info-and-button">
        <Button onClick={this.login}>Log in</Button>
      </div>
    );
  }

  render() {
    return (
      <StyledAdminPage>
        <Menubar imageSource={choir} menuItems={this.generateLinks()} />
        <div className="admin-content">{this.renderContent()}</div>
      </StyledAdminPage>
    );
  }
}

export default Admin;
