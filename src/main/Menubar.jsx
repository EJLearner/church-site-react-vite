import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledMenuBar = styled.header`
  padding-top: 1px; // collapsing margin fix, otherwise, there's white space at the top
  ${(props) =>
    props.imageSource &&
    `background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(${props.imageSource});`};
  padding: 32px var(--gutter-space) 32px var(--gutter-space);

  .main-menu-bar {
    border-top: 1px solid var(--standard-border);
    border-bottom: 1px solid var(--standard-border);
    display: flex;
    font-family: var(--serif);
    font-size: 20px;
    justify-content: center;
    text-transform: uppercase;

    & > div {
      margin: 0 16px;
      padding: 16px 8px;
    }
  }
`;

const Menubar = ({imageSource, menuItems}) => {
  const renderedMenuItems = menuItems.map(({hash = '', text, path}) => {
    return (
      <div className="main-menu-item" key={text}>
        <Link to={path + hash}>{text}</Link>
      </div>
    );
  });

  return (
    <StyledMenuBar imageSource={imageSource}>
      <div className="main-menu-bar">{renderedMenuItems}</div>
    </StyledMenuBar>
  );
};

Menubar.propTypes = {
  imageSource: PropTypes.string,
  menuItems: PropTypes.array.isRequired,
};

export default Menubar;
