import React, {Component} from 'react';

import utils from '../../utils/commonUtils';
import constants from '../../utils/constants';

import BaseRegistrationVolunteer from './BaseRegistrationVolunteer';

class VbsRegistrationVolunteer extends Component {
  renderHeaderContent() {
    return (
      <div>
        <h1 className="vbs-header">Vacation Bible School</h1>
        <h2 className="vbs-header">Volunteer Registration</h2>
      </div>
    );
  }

  render() {
    const vbsYear = utils.getVbsDbYear();

    return (
      <BaseRegistrationVolunteer
        askAvailability
        className="registration-page"
        headerContent={this.renderHeaderContent()}
        refName={`${constants.VBS_REGISTERED_VOLUNTEER_REF_NAME}/${vbsYear}`}
        volunteerIdPropName={constants.VBS_REGISTERED_VOLUNTEER_ID_PROP}
      />
    );
  }
}

export default VbsRegistrationVolunteer;
