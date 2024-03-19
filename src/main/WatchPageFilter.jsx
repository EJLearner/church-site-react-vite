import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button, {BUTTON_COLORS, SHAPES} from './commonComponents/Button/Button';
import Textbox from './commonComponents/Textbox';

const StyledWatchPageFilter = styled.div`
  padding-left: 2em;
  margin-bottom: 4em;

  h3 {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .textboxes {
    display: flex;
    margin-bottom: 1em;

    div {
      margin-right: 4em;
    }
  }
`;

function WatchPageFilter({
  ids,
  searchInfo,
  setSearchInfo,
  onFilterClick,
  onResetClick,
}) {
  const updateTextbox = (newValue, id) => {
    setSearchInfo({
      ...searchInfo,
      [id]: newValue,
    });
  };

  const buttonOptions = {
    buttonShape: SHAPES.RECT,
    color: BUTTON_COLORS.GRAY,
  };

  return (
    <StyledWatchPageFilter>
      <h3>Filter:</h3>
      <div className="textboxes">
        <div>
          <Textbox
            id={ids.titleSearchId}
            label="Sermon Title"
            onChange={updateTextbox}
            onEnter={onFilterClick}
            value={searchInfo[ids.titleSearchId]}
          />
          <br />
          <Textbox
            id={ids.preacherSearchId}
            label="Preacher"
            onChange={updateTextbox}
            onEnter={onFilterClick}
            value={searchInfo[ids.preacherSearchId]}
          />
        </div>
        <div>
          <Textbox
            id={ids.dateSearchId}
            label="Date"
            onChange={updateTextbox}
            onEnter={onFilterClick}
            placeholder="mm/dd/yyyy"
            value={searchInfo[ids.dateSearchId]}
          />
          <br />
          <Textbox
            id={ids.scriptureSearchId}
            label="Scripture"
            onChange={updateTextbox}
            onEnter={onFilterClick}
            value={searchInfo[ids.scriptureSearchId]}
          />
        </div>
      </div>
      <div>
        <Button {...buttonOptions} onClick={onFilterClick}>
          Filter
        </Button>
        <Button {...buttonOptions} onClick={onResetClick}>
          Clear
        </Button>
      </div>
    </StyledWatchPageFilter>
  );
}

WatchPageFilter.propTypes = {
  ids: PropTypes.shape({
    titleSearchId: PropTypes.string.isRequired,
    preacherSearchId: PropTypes.string.isRequired,
    dateSearchId: PropTypes.string.isRequired,
    scriptureSearchId: PropTypes.string.isRequired,
  }).isRequired,
  onFilterClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  searchInfo: PropTypes.object.isRequired,
  setSearchInfo: PropTypes.func.isRequired,
};

export default WatchPageFilter;
