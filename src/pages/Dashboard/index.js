import React from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

// import { Container } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  async function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center h-100">
      <h1>Parabens vc entrou no sistema, mt bom meu garoto</h1>
      <button
        onClick={handleSignOut}
        type="button"
        className="btn w-50 btn-danger"
      >
        <p>Obrigado quero sair</p>
      </button>
    </div>
  );
}
