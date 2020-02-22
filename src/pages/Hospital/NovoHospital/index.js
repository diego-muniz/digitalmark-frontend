import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import FormHospital from '../FormHospital';

export default function NovoHospital() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(hospital) {
    setLoading(true);

    try {
      const response = await api.post('/hospitais', hospital);
      const { data } = response;
      if (data.success) {
        toast.success('Hospital cadastrado com sucesso !');
        history.push('/hospitais');
      } else {
        toast.error('Erro ao cadastrar o hospital !', {
          autoClose: 3500,
        });

        data.data.forEach(msg => {
          toast.warn(msg.message);
        });
      }
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
            <Link to="/hospitais">Hospitais</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Novo
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <FormHospital loading={loading} handleSubmit={handleSubmit} />
        </div>
      </div>
    </Container>
  );
}
