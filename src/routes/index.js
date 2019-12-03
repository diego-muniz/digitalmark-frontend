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
import Servico from '../pages/Servico';
import NovoServico from '../pages/Servico/NovoServico';
import EditarServico from '../pages/Servico/EditarServico';
import Curso from '../pages/Conteudo/Curso';
import NovoCurso from '../pages/Conteudo/Curso/NovoCurso';
import EditarCurso from '../pages/Conteudo/Curso/EditarCurso';
import Modulo from '../pages/Conteudo/Modulo';
import NovoModulo from '../pages/Conteudo/Modulo/NovoModulo';
import EditarModulo from '../pages/Conteudo/Modulo/EditarModulo';
import Aula from '../pages/Conteudo/Modulo/Aula';
import NovaAula from '../pages/Conteudo/Modulo/Aula/NovaAula';
import EditarAula from '../pages/Conteudo/Modulo/Aula/EditarAula';

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
      <Route
        path="/servicos"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={Servico}
      />
      <Route
        path="/servicos/novo"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={NovoServico}
      />
      <Route
        path="/servicos/:id/editar"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={EditarServico}
      />
      <Route
        path="/cursos"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={Curso}
      />
      <Route
        path="/cursos/novo"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={NovoCurso}
      />
      <Route
        path="/cursos/:id/editar"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={EditarCurso}
      />
      <Route
        path="/cursos/:curso_id/modulos"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={Modulo}
      />
      <Route
        path="/cursos/:curso_id/modulos/novo"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={NovoModulo}
      />
      <Route
        path="/cursos/:curso_id/modulos/:id/editar"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={EditarModulo}
      />
      <Route
        path="/cursos/:curso_id/modulos/:modulo_id/aulas"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={Aula}
      />
      <Route
        path="/cursos/:curso_id/modulos/:modulo_id/aulas/novo"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={NovaAula}
      />
      <Route
        path="/cursos/:curso_id/modulos/:modulo_id/aulas/:id/editar"
        Layout={DefaultLayout}
        exact
        isPrivate
        component={EditarAula}
      />

      <Redirect to="/" />
    </Switch>
  );
}
