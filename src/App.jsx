import moment from 'moment';
import React, {Component} from 'react';
import {createGlobalStyle} from 'styled-components';

import TopRoutes from './TopRoutes.jsx';
import './App.css';

const GlobalStyle = createGlobalStyle`
  :root {
    --code: 'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace;
    --sans-serif: Calibri, 'Segoe UI', Candara, Segoe, Optima, Arial, sans-serif;
    --serif: cambria, georgia, 'bookman old style', 'times new roman', serif;
    --quire: "Quire Sans", Helvetica, arial, sans-serif;

    --black: rgb(5, 5, 5);
    --white: rgb(240, 240, 240);
    --gossamer-veil: rgb(240, 238, 235);
    --charcoal-grey: rgb(38, 38, 38);
    --maroon: rgb(142, 19, 27);
    --light-blue: rgb(51, 204, 204);

    --background: var(--black);
    --content: var(--white);

    --standard-background: var(--background);
    --light-background: var(--white);
    --text-on-dark-background: var(--content);
    --text-on-light-background: var(--charcoal-grey);
    --accent-background: rgb(255,192,0);
    --accent-background-2: var(--light-blue);
    --accent-content: var(--text-on-light-background);

    --standard-border: var(--content);
    --border-on-light: var(--charcoal-grey);
    --top-content-background: var(--white);
    --top-content-text: var(--text-on-light-background);
    --second-content-background: var(--gossamer-veil);
    --second-content-text: var(--text-on-light-background);
    --alternate-background-text: var(--charcoal-grey);
    --gutter-space: 64px;
    --page-bottom-padding: 64px;

    --watch-page-text-accent: var(--maroon);

    line-height: 1.5;

    body {
      background-color: var(--standard-background);
      height: 100%;
      padding: 0px;
      margin: 0;

    }

    #root {
      color: var(--text-on-dark-background);
      height: 100%;
    }

    a {
      color: var(--text-on-dark-background);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    h1,h2,h3,h4,h5, h6 {
      font-family: var(--serif);
    }

    input, select {
      border: 1px solid var(--charcoal-grey);
      border-radius: 0;
      font-size: 14px;
      padding: 6px;
    }
  }
`;

class App extends Component {
  render() {
    moment.updateLocale('en', {
      meridiem: (hour) => (hour < 12 ? 'am' : 'pm'),
    });

    return (
      <>
        <GlobalStyle />
        <TopRoutes />
      </>
    );
  }
}

export default App;
