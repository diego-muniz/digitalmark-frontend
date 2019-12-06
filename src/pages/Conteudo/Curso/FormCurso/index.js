import React from 'react';
import * as Yup from 'yup';
import { Form, Input, Select } from '@rocketseat/unform';
// import { Container } from './styles';
import PropTypes from 'prop-types';

const schema = Yup.object().shape({
  nome: Yup.string().required('O titulo é obrigatório'),
  status: Yup.string()
    .oneOf(['ATIVO', 'INATIVO'])
    .required('Status não permitido!'),
  premium: Yup.string('O curso é premium ou livre?').required(
    'O curso é premium ou livre?'
  ),
});

export default function FormCurso({ handleSubmit, loading, data }) {
  return (
    <Form onSubmit={handleSubmit} schema={schema} initialData={data}>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="nome">Título</label>
            <Input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              aria-describedby="nome"
              placeholder="Informe o nome do curso"
            />
          </div>
        </div>
        <div className="col-md-4">
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
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="premium">Tipo do curso</label>
            <Select
              className="form-control"
              name="premium"
              options={[
                { id: 1, title: 'Premium' },
                { id: 0, title: 'Free' },
              ]}
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
FormCurso.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
};

FormCurso.defaultProps = {
  data: {},
};
