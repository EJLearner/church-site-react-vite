import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';

import MainMenubar from './commonComponents/MainMenubar';

const ContactPage = styled.div`
  background-color: var(--gossamer-veil);
  min-height: 100%;

  .content {
    color: var(--text-on-light-background);
    display: flex;
    flex-direction: column;
    padding: 0 var(--gutter-space) var(--page-bottom-padding)
      var(--gutter-space);
    text-align: center;
  }

  p {
    margin: 0 8px;
  }
`;

function RemovedPage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShouldRedirect(true);
    }, 3000);
  }, []);

  if (shouldRedirect) {
    return <Redirect push to="/" />;
  }

  return (
    <ContactPage>
      <MainMenubar imageSource={choir} />
      <div className="content">
        <h1>This page no longer exists</h1>
        <p>
          Sorry, this page can no longer be reached. You will be redirected to
          the main page. Please use the link below if the redirect is not
          successful.
        </p>
      </div>
    </ContactPage>
  );
}

export default RemovedPage;
