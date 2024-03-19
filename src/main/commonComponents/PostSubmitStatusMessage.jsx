import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const POST_STATUSES = {
  FAILURE: 'failure',
  SUCCESS: 'success',
};
const PostSubmitStatusMessageStyle = styled.div`
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
  border: 3px solid;
  border-radius: 10px;
  padding: 0.5em;

  &.success {
    border-color: green;
  }

  &.failure {
    border-color: red;
  }
`;

const defaultInputErrorMessage = (
  <div>
    Invalid data entered
    <br />
    Please check your fields and the error at the top of the page.
  </div>
);

class PostSubmitStatusMessage extends React.Component {
  componentDidMount() {
    this.errorBox?.focus();
  }

  render() {
    const {inputErrorMessage, postStatus, responseError = {}} = this.props;

    let className;
    let message;
    if (postStatus === 'success') {
      className = 'success';
      message = 'Success! Information submitted';
    } else {
      className = 'failure';

      if (postStatus === 'failure') {
        message = (
          <div>
            Submission failed
            <br />
            Code: {responseError.code}
            <br />
            Message: {responseError.message}
            <br />
            Please try again or contact the webmaster
          </div>
        );
      } else {
        message = inputErrorMessage;
      }
    }

    return (
      <div>
        <PostSubmitStatusMessageStyle
          className={className}
          id="success-or-error-box"
          ref={(node) => (this.errorBox = node)}
          tabIndex="0"
          type={className}
        >
          {message}
        </PostSubmitStatusMessageStyle>
      </div>
    );
  }
}

PostSubmitStatusMessage.propTypes = {
  inputErrorMessage: PropTypes.node,
  postStatus: PropTypes.oneOf(Object.values(POST_STATUSES)),
  responseError: PropTypes.object,
};

PostSubmitStatusMessage.defaultProps = {
  inputErrorMessage: defaultInputErrorMessage,
};

export default PostSubmitStatusMessage;
