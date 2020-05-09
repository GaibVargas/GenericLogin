import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from '../pages/Initial';

export default function AuthRoutes() {
  return(
    <Switch>
      <Route path='/' component={Auth} />
    </Switch>
  );
}
