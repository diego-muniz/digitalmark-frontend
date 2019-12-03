import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Loading from '~/components/Loading';
import api from '~/services/api';

import { Container } from './styles';

import FormServico from '../FormServico';

export default function EditarServico({ match }) {
  const [loading, setLoading] = useState(false);
  const [servico, setServico] = useState();
  const [loadingPage, setLoadingPage] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.put(`/servicos/${match.params.id}`, data);
      toast.success('Servico atualizada com sucesso !');
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
    async function getServico() {
      try {
        setLoadingPage(true);
        const response = await api.get(`/servicos/${match.params.id}`);
        const { data } = response;

        // eslint-disable-next-line prefer-destructuring
        setServico(data);
      } catch (error) {
        console.log(error);
        setLoadingPage(false);
      } finally {
        setLoadingPage(false);
      }
    }
    getServico();
  }, [match.params.id]);

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/servicos">Servicos</Link>
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
            <FormServico
              loading={loading}
              handleSubmit={handleSubmit}
              data={servico}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
EditarServico.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

EditarServico.defaultProps = {
  match: {},
};
