import React from 'react';
import styled from 'styled-components';

import {FONT_FAMILIES} from '../utils/styleVariables';

import StandardPageWrapper from './commonComponents/StandardPageWrapper';

const StyleWrapper = styled.div`
  h3 {
    font-family: ${FONT_FAMILIES.ARIAL};
    font-weight: bold;
  }
`;

function RemovedPage() {
  return (
    <StyleWrapper>
      <StandardPageWrapper>
        <h1>This page is coming soon</h1>
        <p>Sorry, this page is not finished. It will be available soon.</p>
      </StandardPageWrapper>
    </StyleWrapper>
  );
}

export default RemovedPage;
