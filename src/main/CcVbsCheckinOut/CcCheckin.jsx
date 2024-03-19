import React, {Component} from 'react';

import routePaths from '../../routePaths';
import commonUtils from '../../utils/commonUtils';
import constants from '../../utils/constants';

import BaseCheckin from './BaseCheckin';

class CcCheckin extends Component {
  render() {
    const ccYear = commonUtils.getCcDbYear();

    return (
      <BaseCheckin
        logbookRefName={constants.CC_LOGBOOK_REF_NAME}
        registerLink={routePaths.CE_CC_REG_CHILD}
        registeredChildrenRefName={`${constants.CC_REGISTERED_CHILDREN_REF_NAME}/${ccYear}`}
        registryAccessRefName={constants.CC_REGISTRY_ACCESS_REF_NAME}
        registryIdName={constants.CC_REGISTERED_CHILD_ID_PROP}
        welcomeName="Children’s Church"
      />
    );
  }
}

export default CcCheckin;
