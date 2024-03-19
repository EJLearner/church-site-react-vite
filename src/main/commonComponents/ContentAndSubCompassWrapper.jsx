import styled from 'styled-components';

import {WIDTHS} from '../../utils/styleVariables';

const ContentAndSubCompassWrapper = styled.div`
  background-color: white;
  margin: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
  ${(props) => (props.padding === false ? '' : 'padding: 0 1em;')}
`;

export default ContentAndSubCompassWrapper;
