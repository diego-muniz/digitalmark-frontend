import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';
import FormEnfermeiro from '../FormEnfermeiro';
import FormHospital from '../../Hospital/FormHospital';

export default function NovoEnfermeiro() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(dataEnf) {
    setLoading(true);

    try {
      const enfermeiro = {
        nome: dataEnf.nome,
        cpf: dataEnf.cpf,
        coren: dataEnf.coren,
        dataNascimento: dataEnf.dataNascimento,
        hospitalId: dataEnf.hospitalId,
      };
      const response = await api.post('/enfermeiros', enfermeiro);
      const { data } = response;
      if (data.success) {
        toast.success('Enfermeiro cadastrado com sucesso !');
        history.push('/enfermeiros');
      } else {
        toast.error('Erro ao cadastrar o enfermeiro !', {
          autoClose: 3500,
        });

        data.data.forEach(msg => {
          toast.warn(msg.message);
        });
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.error);
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
          <FormEnfermeiro handleSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </Container>
  );
}
