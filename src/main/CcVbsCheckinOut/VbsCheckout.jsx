import React, {Component} from 'react';

import constants from '../../utils/constants';

import BaseCheckout from './BaseCheckout';

class VbsCheckout extends Component {
  render() {
    return (
      <BaseCheckout
        logbookRefName={constants.VBS_LOGBOOK_REF_NAME}
        registryAccessRefName={constants.VBS_REGISTRY_ACCESS_REF_NAME}
        registryIdName={constants.VBS_REGISTERED_CHILD_ID_PROP}
        welcomeName="Vacation Bible School"
      />
    );
  }
}

export default VbsCheckout;
