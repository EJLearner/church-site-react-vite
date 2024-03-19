import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {COLORS} from '../../utils/styleVariables';

import InputError from './InputError';
import InputLabel from './InputLabel';

const TextareaStyle = styled.div`
  display: inline-block;
  margin: 0.5em 3em 0.5em 0;

  input {
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 0 #c2c2c2;
    padding: 6px;
  }

  .char-count {
    font-size: 14px;
    color: ${COLORS.GRAY};
  }
`;

function handleChange(event, onChange, id, characterLimit) {
  const {value} = event.target;

  if (characterLimit == null || value.length <= characterLimit) {
    onChange(value, id, event);
  } else {
    alert(`You have exceeded the character limit of ${characterLimit}`);
  }
}

const Textarea = (props) => {
  const {
    characterLimit,
    columns,
    errorMessage,
    id,
    instructions,
    label,
    name,
    onChange,
    placeholder,
    required,
    rows,
    value,
  } = props;

  const errorsId = `${id}-errors`;
  const labelId = `${id}-label`;
  const characterCountId = `${id}-character-count`;
  const instructionsId = `${id}-instructions`;

  const labelledBy = [
    errorMessage && errorsId,
    labelId,
    instructions && instructionsId,
    characterLimit && characterCountId,
  ]
    .filter(Boolean)
    .join(' ');

  const inputOrTextarea = (
    <textarea
      aria-labelledby={labelledBy}
      cols={columns}
      id={id}
      name={name}
      onChange={(event) => handleChange(event, onChange, id, characterLimit)}
      placeholder={placeholder}
      rows={rows}
      value={value}
    />
  );

  let characterCountRender;
  let remainingCharacters;
  if (characterLimit) {
    remainingCharacters = characterLimit - value.length;
    characterCountRender = (
      <div className="char-count" id={characterCountId}>
        Characters Remaining: {remainingCharacters}
      </div>
    );
  }

  return (
    <TextareaStyle className="text-box-pattern">
      {instructions && <p id={instructionsId}>{instructions}</p>}
      <InputLabel htmlFor={id} id={labelId} required={required}>
        {label}
      </InputLabel>
      {errorMessage && <InputError id={errorsId}>{errorMessage}</InputError>}
      {inputOrTextarea}
      {characterCountRender}
    </TextareaStyle>
  );
};

Textarea.defaultProps = {
  rows: 5,
};

Textarea.propTypes = {
  characterLimit: PropTypes.number,
  columns: PropTypes.number,
  errorMessage: PropTypes.string,
  id: PropTypes.string.isRequired,
  instructions: PropTypes.node,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.string.isRequired,
};

export default Textarea;
