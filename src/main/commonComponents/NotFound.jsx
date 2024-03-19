import React from 'react';
import styled from 'styled-components';

import STYLES from '../../utils/styleVariables';

const StyledPageNotFoundDiv = styled.div`
  margin: 0 64px;
  padding: 1em;
  background-color: ${STYLES.LOGICAL_COLORS.STANDARD_BACKGROUND};
`;

function NotFound() {
  return (
    <StyledPageNotFoundDiv>
      <h1>Page Not FOUND</h1>
      <p>
        Sorry, the page that you were looking for was not found. Please click a
        link at the top to navigate to a page.
      </p>
    </StyledPageNotFoundDiv>
  );
}

export default NotFound;
