import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {
  COLORS,
  LOGICAL_COLORS,
  FONT_FAMILIES,
} from '../../utils/styleVariables';

import PlainButton from './PlainButton';

const subMenu = (subLinks) => {
  return (
    <ul>
      {subLinks.map(({elementId, title}) => (
        <li key={elementId}>
          <a href={`#${elementId}`}>{title}</a>
        </li>
      ))}
    </ul>
  );
};

const renderMenuItem = (menuItemData) => {
  const {id, isSelected, onClick, subLinks, renderMenuItemTitle, title} =
    menuItemData;

  return (
    <React.Fragment key={id}>
      {renderMenuItemTitle && (
        // don't show title if there is only one - helpful when we have a
        // single menu item with a within page anchors
        <li
          className={isSelected ? 'selected' : null}
          onClick={() => onClick(id)}
        >
          <ContentButton>{title}</ContentButton>
        </li>
      )}
      {subLinks && isSelected && subMenu(subLinks)}
    </React.Fragment>
  );
};

const LeftSide = styled.div`
  background-color: ${COLORS.WHITE};
  flex-shrink: 0;
  font-family: ${FONT_FAMILIES.ARIAL};
  font-size: 13.33px;
  font-weight: bold;

  ul {
    padding-left: 0;
  }

  ul ul {
    padding-left: 1em;

    a {
      color: black;
    }
  }

  li {
    list-style-type: none;
    padding-bottom: 1em;
    &:hover {
      text-decoration: underline;
    }
  }

  li.selected {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }
`;

const ContentButton = styled(PlainButton)`
  display: block;
  line-height: 150%;
`;

const SideMenu = ({currentId, onClick, menuData, title}) => {
  return (
    <LeftSide>
      <h2>{title}</h2>
      <ul>
        {menuData.map((menuItemInfo) =>
          renderMenuItem({
            ...menuItemInfo,
            onClick: onClick,
            isSelected: menuItemInfo.id === currentId,
            renderMenuItemTitle: Boolean(menuData.length > 1),
          }),
        )}
      </ul>
    </LeftSide>
  );
};

SideMenu.propTypes = {
  currentId: PropTypes.string.isRequired,
  menuData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      isSelected: PropTypes.bool,
      subLinks: PropTypes.arrayOf(
        PropTypes.shape({
          elementId: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }),
      ),
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default SideMenu;
