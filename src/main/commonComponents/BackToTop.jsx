import React from 'react';
import styled from 'styled-components';

import {LOGICAL_COLORS} from '../../utils/styleVariables';

import PlainButton from './PlainButton';
const StyleWrapper = styled.div`
  display: flex;
  justify-content: right;

  i {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }

  .back-to-top-button:hover {
    text-decoration: underline;

    i {
      opacity: 0.7;
    }
  }
`;

function BackToTop() {
  return (
    <StyleWrapper>
      <div className="text-and-icon">
        <PlainButton
          className="back-to-top-button"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          Back To Top <i className="fa fa-arrow-circle-up fa-2x" />
        </PlainButton>
      </div>
    </StyleWrapper>
  );
}

export default BackToTop;
