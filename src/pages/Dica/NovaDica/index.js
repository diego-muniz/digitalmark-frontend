import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import FormDica from '../FormDica';

export default function NovaDica() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.post('/dicas', data);
      history.push('/dicas');
      toast.success('Dica cadastrada com sucesso !');
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
            <Link to="/dicas">Dicas</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Nova
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <FormDica loading={loading} handleSubmit={handleSubmit} />
        </div>
      </div>
    </Container>
  );
}
