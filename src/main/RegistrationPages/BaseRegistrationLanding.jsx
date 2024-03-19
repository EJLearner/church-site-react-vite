import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {FONT_FAMILIES, LOGICAL_COLORS} from '../../utils/styleVariables';

const RegistrationLandingStyle = styled.div`
  display: flex;
  flex-grow: 2;

  .button-div {
    position: absolute;
    background-color: transparent;
    color: inherit;
    display: block;
    margin: 0 auto;
    left: 50%;
    transform: translate(-50%);
    bottom: 20%;
  }

  button {
    background-color: transparent;
    border: 1px solid;
    color: inherit;
    display: block;
    padding: 1.5em;
    margin: 0 auto;
    opacity: 0.9;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  .left-side {
    background-size: 100%;
    color: ${LOGICAL_COLORS.CT_TEXT_ON_DARK};
    flex-basis: 0;
    flex-grow: 1;
    position: relative;

    img {
      overflow-y: hidden;
      position: absolute;
      width: 100%;
      z-index: 0;
    }

    button {
      background-color: ${LOGICAL_COLORS.STANDARD_BACKGROUND};
      color: ${LOGICAL_COLORS.STANDARD_TEXT};
    }
  }

  div.sentence {
    position: absolute;
    font-size: 300%;
    margin: 20vh 0 2em 10%;
    z-index: 2;

    span {
      display: block;
    }

    span.first-part {
      font-weight: bold;
      text-transform: uppercase;
    }

    span.rest-of-sentence {
      font-family: ${FONT_FAMILIES.CENTURY_GOTHIC};
    }
  }
`;

const types = {
  VACATION_BIBLE: 'Vacation Bible School',
  CHILDRENS_CHURCH: 'Children’s Church',
};

const RegistrationLanding = ({
  imgPath,
  onClickAdultAttend,
  type,
  onClickChildAttend,
}) => {
  return (
    <RegistrationLandingStyle className="registration-landing">
      <div className="left-side" style={{backgroundImage: `url(${imgPath})`}}>
        <div className="sentence">
          <span className="first-part">Register </span>
          <span className="rest-of-sentence">for a Class</span>
        </div>
        <div className="button-div">
          {onClickAdultAttend && (
            <>
              <button onClick={onClickAdultAttend}>
                I want to attend {type}.
              </button>
              <br />
            </>
          )}
          <button onClick={onClickChildAttend}>
            I want my child to attend {type}.
          </button>
        </div>
      </div>
    </RegistrationLandingStyle>
  );
};

RegistrationLanding.propTypes = {
  imgPath: PropTypes.string,
  onClickAdultAttend: PropTypes.func,
  onClickChildAttend: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(types)),
};

RegistrationLanding.TYPES = types;

export default RegistrationLanding;
