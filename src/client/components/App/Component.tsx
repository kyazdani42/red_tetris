import * as React from 'react';
import { Route } from 'react-router-dom';

import { MainPage } from '../MainPage/Component';

export const App = () => (
  <div>
    <Route exact path="/" component={MainPage} />
    <Route path="/:room[:player_name]" />
  </div>
);
