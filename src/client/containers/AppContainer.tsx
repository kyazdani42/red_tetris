import * as React from 'react';
import { Route } from 'react-router-dom';

import GameContainer from './GameContainer';
import RoomContainer from './RoomContainer';
import { GlobalStyle } from './styles';

export const App = () => (
  <React.Fragment>
    <Route exact path="/" component={RoomContainer} />
    <Route path="/:room[:player_name]" component={GameContainer} />
    <GlobalStyle />
  </React.Fragment>
);
