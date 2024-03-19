import React, {Component} from 'react';

import utils from '../../utils/commonUtils';
import constants from '../../utils/constants';

import BaseRegistrationVolunteer from './BaseRegistrationVolunteer';

class CcRegistrationVolunteer extends Component {
  renderHeaderContent() {
    return (
      <div>
        <h1>Children’s Church</h1>
        <h2>Volunteer Registration</h2>
      </div>
    );
  }

  render() {
    const ccYear = utils.getCcDbYear();

    return (
      <BaseRegistrationVolunteer
        className="registration-page"
        headerContent={this.renderHeaderContent()}
        refName={`${constants.CC_REGISTERED_VOLUNTEER_REF_NAME}/${ccYear}`}
        volunteerIdPropName={constants.CC_REGISTERED_VOLUNTEER_ID_PROP}
      />
    );
  }
}

export default CcRegistrationVolunteer;
