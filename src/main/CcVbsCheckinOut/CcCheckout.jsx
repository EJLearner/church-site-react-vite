import React, {Component} from 'react';

import constants from '../../../utils/constants';

import BaseCheckout from './BaseCheckout';

class CcCheckout extends Component {
  render() {
    return (
      <BaseCheckout
        logbookRefName={constants.CC_LOGBOOK_REF_NAME}
        registryAccessRefName={constants.CC_REGISTRY_ACCESS_REF_NAME}
        registryIdName={constants.CC_REGISTERED_CHILD_ID_PROP}
        welcomeName="Children’s Church"
      />
    );
  }
}

export default CcCheckout;
