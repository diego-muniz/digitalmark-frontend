import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Loading from '~/components/Loading';
import api from '~/services/api';

import { Container } from './styles';

import FormAula from '../FormAula';

export default function EditarAula({ match }) {
  const [loading, setLoading] = useState(false);
  const [aula, setAula] = useState();
  const [loadingPage, setLoadingPage] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.put(
        `/cursos/${match.params.curso_id}/modulos/${match.params.modulo_id}/aulas/${match.params.id}`,
        data
      );
      toast.success('Aula atualizada com sucesso !');
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

  useEffect(() => {
    async function getAula() {
      try {
        setLoadingPage(true);
        const response = await api.get(
          `/cursos/${match.params.curso_id}/modulos/${match.params.modulo_id}/aulas/${match.params.id}`
        );
        const { data } = response;
        // eslint-disable-next-line prefer-destructuring
        setAula(data);
      } catch (error) {
        setLoadingPage(false);
      } finally {
        setLoadingPage(false);
      }
    }
    getAula();
  }, [match.params.curso_id, match.params.id, match.params.modulo_id]);

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/cursos">Cursos</Link>
          </li>
          <li className="breadcrumb-item " aria-current="page">
            <Link to={`/cursos/${match.params.curso_id}/modulos/`}>
              Módulos
            </Link>
          </li>
          <li className="breadcrumb-item " aria-current="page">
            <Link
              to={`/cursos/${match.params.curso_id}/modulos/${match.params.modulo_id}/aulas/`}
            >
              Aulas
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {aula && aula.nome}
          </li>
        </ol>
      </nav>
      {loadingPage ? (
        <Loading />
      ) : (
        <div className="card">
          <div className="card-body">
            <FormAula
              loading={loading}
              handleSubmit={handleSubmit}
              data={aula}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
EditarAula.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      curso_id: PropTypes.node,
      modulo_id: PropTypes.node,
      id: PropTypes.node,
    }),
  }),
};

EditarAula.defaultProps = {
  match: {},
};
