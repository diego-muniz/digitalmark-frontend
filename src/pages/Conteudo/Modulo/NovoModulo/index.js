import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import FormModulo from '../FormModulo';

export default function NovoModulo({ match }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.post(`/cursos/${match.params.curso_id}/modulos`, data);
      history.push(`/cursos/${match.params.curso_id}/modulos`);
      toast.success('Modulo cadastrado com sucesso !');
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/cursos">Cursos</Link>
          </li>
          <li className="breadcrumb-item " aria-current="page">
            <Link to={`/cursos/${match.params.curso_id}/modulos`}>Módulos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Novo
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <FormModulo loading={loading} handleSubmit={handleSubmit} />
        </div>
      </div>
    </Container>
  );
}
NovoModulo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      curso_id: PropTypes.string,
    }),
  }),
};

NovoModulo.defaultProps = {
  match: {},
};
