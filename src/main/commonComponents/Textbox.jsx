import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import InputLabel from './InputLabel';

const TextboxStyle = styled.div`
  display: inline-block;
  margin: 1em 16px 0.5em 0;

  .text-box-pattern {
    display: inline-block;
    margin: 0.5em 0;
  }

  .text-box-pattern label {
    display: block;
  }
`;

const Textbox = (props) => {
  const {
    errors,
    id,
    instructions,
    label,
    name,
    onChange,
    onEnter,
    placeholder,
    required,
    size,
    type,
    value,
  } = props;

  const onKeyPress = (event) => {
    if (onEnter && event.key === 'Enter') {
      onEnter(event.target.value, id, event);
    }
  };

  const errorsId = `${id}-errors`;
  const labelId = `${id}-label`;
  const instructionsId = `${id}-instructions`;

  const labelledBy = [
    errors && errorsId,
    labelId,
    instructions && instructionsId,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TextboxStyle className="text-box-pattern">
      {instructions && <p id={instructionsId}>{instructions}</p>}
      <InputLabel htmlFor={id} id={labelId} required={required}>
        {label}
      </InputLabel>
      {errors && <div id={errorsId}>{errors}</div>}
      <input
        aria-labelledby={labelledBy}
        id={id}
        name={name || id}
        onChange={(event) => onChange(event.target.value, id, event)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        size={size}
        type={type}
        value={value}
      />
    </TextboxStyle>
  );
};

Textbox.propTypes = {
  errors: PropTypes.node,
  id: PropTypes.string.isRequired,
  instructions: PropTypes.node,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default Textbox;
