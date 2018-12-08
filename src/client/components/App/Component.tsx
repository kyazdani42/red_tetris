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
`;

export const App = () => (
  <React.Fragment>
    <BackgroundCanvas />
    <Route exact path="/" component={RoomsManager} />
    <Route path="/:room[:player_name]" />
    <GlobalStyle />
  </React.Fragment>
);
