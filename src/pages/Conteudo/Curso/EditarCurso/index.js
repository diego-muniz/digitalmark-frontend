import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Loading from '~/components/Loading';
import api from '~/services/api';

import { Container } from './styles';

import FormCurso from '../FormCurso';

export default function EditarCurso({ match }) {
  const [loading, setLoading] = useState(false);
  const [curso, setCurso] = useState();
  const [loadingPage, setLoadingPage] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.put(`/cursos/${match.params.id}`, data);
      toast.success('Curso atualizada com sucesso !');
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
    async function getCurso() {
      try {
        setLoadingPage(true);
        const response = await api.get(`/cursos/${match.params.id}`);
        const { data } = response;

        // eslint-disable-next-line prefer-destructuring
        setCurso(data);
      } catch (error) {
        console.log(error);
        setLoadingPage(false);
      } finally {
        setLoadingPage(false);
      }
    }
    getCurso();
  }, [match.params.id]);

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/cursos">Cursos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Nova
          </li>
        </ol>
      </nav>
      {loadingPage ? (
        <Loading />
      ) : (
        <div className="card">
          <div className="card-body">
            <FormCurso
              loading={loading}
              handleSubmit={handleSubmit}
              data={curso}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
EditarCurso.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

EditarCurso.defaultProps = {
  match: {},
};
