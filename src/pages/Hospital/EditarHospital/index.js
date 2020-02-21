import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Loading from '~/components/Loading';
import api from '~/services/api';

import { Container } from './styles';

import FormHospital from '../FormHospital';

export default function EditarHospital({ match }) {
  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState();
  const [loadingPage, setLoadingPage] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.put(`/hospitais/${match.params.id}`, data);
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
        const response = await api.get(`/hospitais/${match.params.id}`);
        const { data } = response;

        console.log(data);
        setHospital(data);
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
            <Link to="/hospitais">Hospitais</Link>
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
            <FormHospital
              loading={loading}
              handleSubmit={handleSubmit}
              data={hospital}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
EditarHospital.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

EditarHospital.defaultProps = {
  match: {},
};
