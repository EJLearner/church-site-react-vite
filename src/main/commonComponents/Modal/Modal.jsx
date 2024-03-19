import PropTypes from 'prop-types';
import React, {Component} from 'react';

import './Modal.css';

class Modal extends Component {
  componentDidMount() {
    document.body.style.overflowY = 'hidden';
    this.modal.focus();
  }

  componentWillUnmount() {
    document.body.style.overflowY = 'auto';
  }

  render() {
    const {className, children, onCloseClick} = this.props;

    const modalContentClass = [className, 'modal-content']
      .filter(Boolean)
      .join(' ');

    return (
      <div>
        <div className="modal-overlay">
          <div className="modal-box">
            <div
              className={modalContentClass}
              ref={(node) => (this.modal = node)}
              tabIndex="0"
            >
              {children}
            </div>
            {onCloseClick && (
              <i
                className="close-icon fa fa-2x fa-times-circle"
                onClick={onCloseClick}
                tabIndex="0"
                title="Close Button"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  // will be used on the div surrounding the content box
  className: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired,
};

export default Modal;
