import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Loading from '~/components/Loading';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import FormEnfermeiro from '../FormEnfermeiro';

export default function EditarEnfermeiro({ match }) {
  const [loading, setLoading] = useState(false);
  const [enfermeiro, setEnfermeiro] = useState();
  const [loadingPage, setLoadingPage] = useState(false);
  const [dataEnfermeiro, setDataEnfermeiro] = useState({});

  async function handleSubmit(data) {
    setLoading(true);
    try {
      // setDataEnfermeiro({ ...data });
      const enfermeiro = {
        ...data,
        ...dataEnfermeiro,
      };

      const response = await api.put(`/enfermeiros`, enfermeiro);
      if (response.data.success) {
        toast.success('Enfermeiro atualizado com sucesso !');
        history.push('/enfermeiros');
      } else {
        toast.success('Erro ao atualizar o enfermeiro !');
      }
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.forEach(e => {
          toast.error(e.message);
        });
      } else {
        toast.error('Erro ao atualizar o enfermeiro!');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getEnfermeiro() {
      try {
        setLoadingPage(true);
        const response = await api.get(`/enfermeiros/${match.params.id}`);
        const { data } = response;

        const dataNascimento = data.data.dataNascimento.split('T')[0];

        if (!data.success) {
          toast.error(data.message);
          setLoadingPage(false);
        }

        data.data.dataNascimento = dataNascimento;
        setDataEnfermeiro({ id: data.data.enfermeiroId });

        console.log(data.data);

        setEnfermeiro(data.data);
      } catch (error) {
        setLoadingPage(false);
      } finally {
        setLoadingPage(false);
      }
    }
    getEnfermeiro();
  }, [match.params.id]);

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/enfermeiros">Enfermeiros</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Editar
          </li>
        </ol>
      </nav>
      {loadingPage ? (
        <Loading />
      ) : (
        <div className="card">
          <div className="card-body">
            <FormEnfermeiro
              loading={loading}
              handleSubmit={handleSubmit}
              data={enfermeiro}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
EditarEnfermeiro.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

EditarEnfermeiro.defaultProps = {
  match: {},
};
