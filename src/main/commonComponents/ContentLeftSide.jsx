import styled from 'styled-components';

import {LOGICAL_COLORS} from '../../utils/styleVariables';

const ContentLeftSide = styled.div`
  min-width: 15%;
  padding: 1em;

  h2 {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
    margin-top: 0;
    font-size: 110%;
    text-transform: uppercase;
  }
`;

export default ContentLeftSide;
