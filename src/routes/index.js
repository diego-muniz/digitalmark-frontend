/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import DefaultLayout from '~/pages/_layouts/default';

import Enfermeiro from '../pages/Enfermeiro';
import Hospital from '../pages/Hospital';

import NovoEnfermeiro from '../pages/Enfermeiro/NovoEnfermeiro';
import EditarEnfermeiro from '../pages/Enfermeiro/EditarEnfermeiro';
import NovoHospital from '../pages/Hospital/NovoHospital';
import EditarHospital from '../pages/Hospital/EditarHospital';

export default function Routes() {
  return (
    <Switch>
      <Route
        path="/enfermeiros"
        Layout={DefaultLayout}
        exact
        component={Enfermeiro}
      />

      <Route
        path="/enfermeiros"
        Layout={DefaultLayout}
        exact
        component={Enfermeiro}
      />

      <Route
        path="/enfermeiros/novo"
        Layout={DefaultLayout}
        exact
        component={NovoEnfermeiro}
      />

      <Route
        path="/enfermeiros/:id/editar"
        Layout={DefaultLayout}
        exact
        component={EditarEnfermeiro}
      />

      <Route
        path="/hospitais"
        Layout={DefaultLayout}
        exact
        component={Hospital}
      />

      <Route
        path="/hospitais/novo"
        Layout={DefaultLayout}
        exact
        component={NovoHospital}
      />

      <Route
        path="/hospitais/:id/editar"
        Layout={DefaultLayout}
        exact
        component={EditarHospital}
      />

      <Redirect to="/enfermeiros" />
    </Switch>
  );
}
