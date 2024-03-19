import React, {Component} from 'react';
import {Redirect} from 'react-router';

import routePaths from '../../routePaths';

import BaseRegistrationLanding from './BaseRegistrationLanding.jsx';
import leftPicture from './ccregpicture.png';

class CcRegistrationLanding extends Component {
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
        onClickChildAttend={() => this.setPageState(routePaths.CE_CC_REG_CHILD)}
        onClickVolunteer={() =>
          this.setPageState(routePaths.CE_CC_REG_VOLUNTEER)
        }
        type={BaseRegistrationLanding.TYPES.CHILDRENS_CHURCH}
      />
    );
  }
}

export default CcRegistrationLanding;
