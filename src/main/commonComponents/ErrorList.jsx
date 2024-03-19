import PropTypes from 'prop-types';
import React from 'react';

const ErrorList = (props) => {
  const errorList = props.errors.map((error, index) => {
    return <li key={index}>{error.message}</li>;
  });

  return (
    <div className="error-list">
      <i className="fa fa-exclamation-triangle" />
      Oops, there were some errors!
      <ul>{errorList}</ul>
    </div>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default ErrorList;
