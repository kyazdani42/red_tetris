import * as React from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import RoomsManager from '../RoomsManager/Component';
import { BackgroundCanvas } from './BackgroundCanvas/Component';

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  @font-face {
    font-family: 'Circular Book';
    font-style: normal;
    font-weight: normal;
    src: local('Circular Book'), url('lineto-circular-pro-book.woff') format('woff');
  }
  @font-face {
    font-family: 'Circular Book Italic';
    font-style: normal;
    font-weight: normal;
    src: local('Circular Book Italic'), url('lineto-circular-pro-bookItalic.woff') format('woff');
  }
  @font-face {
    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: normal;
    src: local('Circular Bold'), url('lineto-circular-pro-bold.woff') format('woff');
  }
`;

export const App = () => (
  <React.Fragment>
    <BackgroundCanvas />
    <Route exact path="/" component={RoomsManager} />
    <Route path="/:room[:player_name]" />
    <GlobalStyle />
  </React.Fragment>
);
