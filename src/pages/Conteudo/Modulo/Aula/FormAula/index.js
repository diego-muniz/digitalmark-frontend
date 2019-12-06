import React from 'react';
import * as Yup from 'yup';
import { Form, Input, Select } from '@rocketseat/unform';
// import { Container } from './styles';
import PropTypes from 'prop-types';

const schema = Yup.object().shape({
  nome: Yup.string().required('O titulo é obrigatório'),
  status: Yup.string()
    .oneOf(['ATIVO', 'INATIVO'], 'O status deve ser "ATIVO" OU "INATIVO"')
    .required('Status não permitido!'),
  link: Yup.string()
    .url('O link precisa ser uma URL válida')
    .required('Link é obrigatório'),
  descricao: Yup.string().required('A descrição é obrigatória'),
});

export default function FormAula({ handleSubmit, loading, data }) {
  return (
    <Form onSubmit={handleSubmit} schema={schema} initialData={data}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <Input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              aria-describedby="nome"
              placeholder="Informe o nome do aula"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <Select
              className="form-control"
              name="status"
              options={[
                { id: 'ATIVO', title: 'ATIVO' },
                { id: 'INATIVO', title: 'INATIVO' },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <Input
              type="text"
              className="form-control"
              id="link"
              name="link"
              aria-describedby="link"
              placeholder="Informe o link da aula"
            />
            <small id="link" className="form-text text-muted">
              Informe um link do youtube. <br />
              Exemplo: &quot;https://www.youtube.com/watch?v=YINTTVjBrY4&quot;.
            </small>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="conteudo">Descrição</label>
            <Input
              multiline
              type="text"
              className="form-control"
              id="descricao"
              name="descricao"
              aria-describedby="descricao"
              placeholder="Informe a descrição da aula"
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {loading ? 'Carregando...' : 'Enviar'}
      </button>
    </Form>
  );
}
FormAula.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
};

FormAula.defaultProps = {
  data: {},
};
