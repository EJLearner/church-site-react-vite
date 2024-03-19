import React, {Component} from 'react';
import {Redirect} from 'react-router';

import routePaths from '../../routePaths';

import BaseRegistrationLanding from './BaseRegistrationLanding.jsx';
import leftPicture from './vbsregpicture.png';

class VbsRegistrationLanding extends Component {
  state = {};

  setPageState(path) {
    this.setState({redirect: path});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }

    return (
      <BaseRegistrationLanding
        imgPath={leftPicture}
        onClickAdultAttend={() =>
          this.setPageState(routePaths.CE_VBS_REG_ADULT)
        }
        onClickChildAttend={() =>
          this.setPageState(routePaths.CE_VBS_REG_CHILD)
        }
        onClickVolunteer={() =>
          this.setPageState(routePaths.CE_VBS_REG_VOLUNTEER)
        }
        type={BaseRegistrationLanding.TYPES.VACATION_BIBLE}
      />
    );
  }
}

export default VbsRegistrationLanding;
