import styled from 'styled-components';

import {
  LOGICAL_COLORS,
  COLORS,
  FONT_FAMILIES,
} from '../../utils/styleVariables';

import contentWrapperH2Mixin from './contentWrapperH2Mixin';

const ContentWrapper = styled.div`
  background-color: ${COLORS.WHITE};
  border-left: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
  font-size: 13px;
  line-height: 150%;
  padding: 1em;
  width: ${(props) => (props.fullWidth ? '100%' : '70%')};

  h2 {
    ${contentWrapperH2Mixin}
  }

  h3 {
    font-family: ${FONT_FAMILIES.CAMBRIA};
    font-size: 20px;
    letter-spacing: 0.01em;
    line-height: 110%;
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }

  h1,
  h2 {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
    margin-top: 0.03em;
    text-transform: uppercase;
  }
`;

export default ContentWrapper;
