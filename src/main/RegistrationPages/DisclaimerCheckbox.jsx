import PropTypes from 'prop-types';
import React from 'react';

const DisclaimerCheckbox = ({checked, id: inputId, onChange}) => {
  const labelId = `${inputId}-label`;

  return (
    <div className="registration-disclaimer">
      <p>
        The City Temple of Baltimore (Baptist) reserves the right to use any
        photograph/video taken at any event sponsored by City Temple, without
        the expressed written permission of those included within the
        photograph/video. City Temple may use the photograph/video in
        publications or other media material produced, used or contracted by
        City Temple including but not limited to: brochures, invitations, books,
        newspapers, magazines, television, websites, etc.
      </p>

      <p>
        To ensure the privacy of individuals and children, images will not be
        identified using full names or personal identifying information without
        written approval from the photographed subject, parent or legal
        guardian.
      </p>

      <p>
        By participating in a City Temple event or by failing to notify City
        Temple, in writing, your desire to not have your photograph used by City
        Temple, you are agreeing to release, defend, hold harmless and indemnify
        City Temple from any and all claims involving the use of your picture or
        likeness.
      </p>

      <p>
        Any person or organization not affiliated with City Temple may not use,
        copy, alter or modify City Temple photographs, graphics, videography or
        other, similar reproductions or recordings without the advance written
        permission of an authorized designee from City Temple.
      </p>

      <p>Thank you for your understanding and cooperation!</p>

      <input
        aria-labelledby={labelId}
        checked={checked}
        id={inputId}
        onChange={(event) => onChange(event.target.checked, inputId, event)}
        type="checkbox"
        value={inputId}
      />
      <label htmlFor={inputId} id={labelId}>
        Check here to indicate that you have read and agree to the above terms.
      </label>
      <br />
      <br />
    </div>
  );
};

export default DisclaimerCheckbox;

DisclaimerCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
