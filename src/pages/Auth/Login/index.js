import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});
export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <Form onSubmit={handleSubmit} schema={schema}>
      <div className="form-group">
        <label>Email</label>
        <Input
          type="email"
          name="email"
          className="form-control"
          placeholder="Seu E-mail"
        />
      </div>
      <div className="form-group">
        <label>Senha</label>

        <Input
          type="password"
          name="password"
          placeholder="Sua Senha"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-block btn-primary">
        {loading ? 'Carregando...' : 'Acessar'}
      </button>
    </Form>
  );
}
