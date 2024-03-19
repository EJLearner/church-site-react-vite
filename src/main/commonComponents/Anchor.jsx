import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const Anchor = ({external, onClick, path, children, className}) => {
  if (external || onClick) {
    const onClickHandler = (event) => {
      if (onClick) {
        event.preventDefault();
        onClick();
      }
    };

    return (
      <a
        className={className}
        href={path}
        onClick={onClickHandler}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={path}>
      {children}
    </Link>
  );
};

Anchor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  external: PropTypes.bool,
  onClick: PropTypes.func,
  path: PropTypes.string,
};

export default Anchor;
