import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import getVerseInfo from '../../stores/getVerseInfo';

const StyleWrapper = styled.div`
  .v {
    vertical-align: super;
    font-size: 10px;
  }

  .reference {
    color: var(--charcoal-grey);
    font-weight: bold;
  }
`;

const LOAD_STATES = {
  loading: 'loading',
  complete: 'complete',
  error: 'error',
};

function LoadingMessage() {
  return (
    <div>
      <i className="fa fa-spinner fa-pulse" /> Loading Passage
    </div>
  );
}

function renderPassages(passages) {
  return passages.map(({content, reference}) => {
    return <div dangerouslySetInnerHTML={{__html: content}} key={reference} />;
  });
}

function Verse({className, passage, referenceText}) {
  const [passages, setPassages] = useState([]);
  const [loadState, setLoadState] = useState(LOAD_STATES.loading);

  useEffect(() => {
    getVerseInfo(passage, (response) => {
      setPassages(response);

      const newLoadState = response ? LOAD_STATES.complete : LOAD_STATES.error;
      setLoadState(newLoadState);
    });
  }, [passage]);

  const getReferenceTextLine = () => {
    switch (loadState) {
      case LOAD_STATES.complete:
        return referenceText || passages?.[0]?.reference;
      case LOAD_STATES.error:
        return `Error loading ${passage}`;
      default:
        return <LoadingMessage />;
    }
  };

  return (
    <StyleWrapper className={className ?? undefined}>
      <span className="reference">{getReferenceTextLine()}</span>
      {loadState === LOAD_STATES.complete && renderPassages(passages)}
    </StyleWrapper>
  );
}

Verse.propTypes = {
  className: PropTypes.string,
  passage: PropTypes.string.isRequired,
  /** String used to display which verses are used if provided */
  referenceText: PropTypes.string,
};

export default Verse;
