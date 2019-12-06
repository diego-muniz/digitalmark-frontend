import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { Container } from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório'),
});

export default function Categoria() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  async function obterCategorias() {
    const response = await api.get('/categorias');
    setCategorias(response.data.data);
  }

  async function handleSubmit({ nome }, { resetForm }) {
    setLoading(true);

    try {
      await api.post('/categorias', { nome });
      resetForm();
      obterCategorias();
      toast.success('Categoria cadastrada com sucesso !');
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obterCategorias();
  }, []);
  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Categoria
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <Form onSubmit={handleSubmit} schema={schema}>
            <div className="form-group">
              <label htmlFor="nome">Nome da categoria</label>
              <Input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                aria-describedby="nome"
                placeholder="Informe o nome da categoria"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {loading ? 'Carregando...' : 'Enviar'}
            </button>
          </Form>
        </div>
      </div>

      <div className="card mt-5">
        <div className="card-body table-responsive">
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Qtd Sonhos</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map(categoria => (
                <tr key={categoria.id}>
                  <td>{categoria.nome}</td>
                  <td>{categoria.__meta__.total_sonhos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
