import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '~/pages/Auth/Login';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';
import Dashboard from '../pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" Layout={AuthLayout} blank exact component={Login} />
      <Route
        path="/dashboard"
        Layout={DefaultLayout}
        blank
        exact
        isPrivate
        component={Dashboard}
      />
    </Switch>
  );
}
