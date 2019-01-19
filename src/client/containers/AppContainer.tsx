import * as React from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Background } from '../components/Background';
import GameContainer from './GameContainer';
import RoomContainer from './RoomContainer';

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
    src: local('assets/Circular Book');
  }
  @font-face {
    font-family: 'Circular Book Italic';
    font-style: normal;
    font-weight: normal;
    src: local('assets/Circular Book Italic');
  }
  @font-face {
    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: normal;
    src: local('assets/Circular Bold');
  }
`;

export const App = () => (
  <React.Fragment>
    <Background />
    <Route exact path="/" component={RoomContainer} />
    <Route path="/:room[:player_name]" component={GameContainer} />
    <GlobalStyle />
  </React.Fragment>
);
