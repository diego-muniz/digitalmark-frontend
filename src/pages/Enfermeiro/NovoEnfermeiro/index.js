import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import FormEnfermeiro from '../FormEnfermeiro';
import FormHospital from '../../Hospital/FormHospital';

export default function NovoEnfermeiro() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.post('/enfermeiros', data);
      history.push('/enfermeiros');
      toast.success('Enfermeiro cadastrado com sucesso !');
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
            <Link to="/enfermeiros">Enfermeiros</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Novo
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <FormEnfermeiro loading={loading} handleSubmit={handleSubmit} />
        </div>
      </div>
    </Container>
  );
}
