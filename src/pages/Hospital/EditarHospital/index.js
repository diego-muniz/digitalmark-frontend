import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Loading from '~/components/Loading';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import FormHospital from '../FormHospital';

export default function EditarHospital({ match }) {
  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState();
  const [dataHospital, setDataHospital] = useState();
  const [loadingPage, setLoadingPage] = useState(false);

  async function handleSubmit(dataHosp) {
    setLoading(true);
    try {
      const hospitalData = {
        ...dataHosp,
        ...dataHospital,
      };
      const response = await api.put(`/hospitais`, hospitalData);
      const { data } = response;
      if (data.success) {
        toast.success('Hospital atualizado com sucesso !');
        history.push('/hospitais');
      } else {
        toast.error('Erro ao editar o hospital !', {
          autoClose: 3500,
        });

        data.data.forEach(msg => {
          toast.warn(msg.message);
        });
      }
    } catch (error) {
      console.log('teste');
      // toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getHospital() {
      try {
        setLoadingPage(true);
        const response = await api.get(`/hospitais/${match.params.id}`);
        const { data } = response;

        setDataHospital({ id: data.id });
        setHospital(data);
      } catch (error) {
        setLoadingPage(false);
      } finally {
        setLoadingPage(false);
      }
    }
    getHospital();
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
