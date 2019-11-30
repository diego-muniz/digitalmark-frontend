import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Loading from '~/components/Loading';
import api from '~/services/api';

import { Container } from './styles';

import FormDica from '../FormDica';

export default function EditarDica({ match }) {
  const [loading, setLoading] = useState(false);
  const [dica, setDica] = useState();
  const [loadingPage, setLoadingPage] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.put(`/dicas/${match.params.id}`, data);
      toast.success('Dica atualizada com sucesso !');
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
    async function getDica() {
      try {
        setLoadingPage(true);
        const response = await api.get(`/dicas/${match.params.id}`);
        const { data } = response;

        // eslint-disable-next-line prefer-destructuring
        data.data_enviar = data.data_enviar.split('T')[0];
        setDica(data);
      } catch (error) {
        setLoadingPage(false);
      } finally {
        setLoadingPage(false);
      }
    }
    getDica();
  }, [match.params.id]);

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/dicas">Dicas</Link>
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
            <FormDica
              loading={loading}
              handleSubmit={handleSubmit}
              data={dica}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
EditarDica.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

EditarDica.defaultProps = {
  match: {},
};
