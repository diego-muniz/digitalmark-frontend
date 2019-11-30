/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import Login from '~/pages/Auth/Login';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import Dashboard from '../pages/Dashboard';
import Categoria from '../pages/Categoria';
import Dica from '../pages/Dica';
import NovaDica from '../pages/Dica/NovaDica';
import EditarDica from '../pages/Dica/EditarDica';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" Layout={AuthLayout} blank exact component={Login} />
      <Route
        path="/dashboard"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={Dashboard}
      />
      <Route
        path="/categorias"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={Categoria}
      />
      <Route
        path="/dicas"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={Dica}
      />
      <Route
        path="/dicas/nova"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={NovaDica}
      />
      <Route
        path="/dicas/:id/editar"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={EditarDica}
      />

      <Redirect to="/" />
    </Switch>
  );
}
