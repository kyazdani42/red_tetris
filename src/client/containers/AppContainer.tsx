import * as React from 'react';
import { Route } from 'react-router-dom';

import GameContainer from './GameContainer';
import { Music } from './Music';
import RoomContainer from './RoomContainer';
import { BackgroundImage, GlobalStyle } from './styles';

export const App = () => (
  <React.Fragment>
    <Route exact path="/" component={RoomContainer} />
    <Route path="/:room[:player_name]" component={GameContainer} />
    <GlobalStyle />
    <Music />
    <BackgroundImage />
  </React.Fragment>
);
