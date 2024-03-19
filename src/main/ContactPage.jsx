import React from 'react';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';

import MainMenubar from './commonComponents/MainMenubar';

const StyledContactPage = styled.div`
  background: var(--black);
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(${choir});
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 18px;
  min-height: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    justify-content: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    padding-bottom: var(--page-bottom-padding);
    text-align: center;
  }

  p {
    letter-spacing: 1.1px;
    line-height: 200%;
  }
`;

const BibleStudyPage = () => {
  return (
    <StyledContactPage>
      <MainMenubar />
      <div className="content-wrapper">
        <div className="content">
          <h2>Want to know more?</h2>
          <p>
            410.462.4800
            <br />
            church@thecitytemple.org
          </p>
          <br />
          <p>
            317 Dolphin Street
            <br />
            Baltimore, MD 21217
            <br />
          </p>
        </div>
      </div>
    </StyledContactPage>
  );
};

export default BibleStudyPage;
