import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import FormAula from '../FormAula';

export default function NovaAula({ match }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.post(
        `/cursos/${match.params.curso_id}/modulos/${match.params.modulo_id}/aulas`,
        data
      );
      history.push(
        `/cursos/${match.params.curso_id}/modulos/${match.params.modulo_id}/aulas`
      );
      toast.success('Aula cadastrado com sucesso !');
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.forEach(e => {
          toast.error(e.message);
        });
      } else {
        toast.error('Alguma coisa deu errado!');
      }
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
            <Link to={`/cursos/${match.params.curso_id}/aulas`}>Módulos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Novo
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <FormAula loading={loading} handleSubmit={handleSubmit} />
        </div>
      </div>
    </Container>
  );
}
NovaAula.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      curso_id: PropTypes.string,
      modulo_id: PropTypes.string,
    }),
  }),
};

NovaAula.defaultProps = {
  match: {},
};
