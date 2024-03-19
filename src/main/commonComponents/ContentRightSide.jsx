import styled from 'styled-components';

import {LOGICAL_COLORS} from '../../utils/styleVariables';

const ContentRightSide = styled.div`
  border-left: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 15%;
  max-width: 25%;
  padding: 1em 1em 0 2em;
`;

export default ContentRightSide;
