import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
// import { Container } from './styles';
import PropTypes from 'prop-types';

import ImageInput from '~/components/ImageInput';

const schema = Yup.object().shape({
  titulo: Yup.string().required('O titulo é obrigatório'),
  conteudo: Yup.string().required('O conteudo é obrigatório'),
  link: Yup.string().url('O link não é valido'),
  data_enviar: Yup.string().required('A data para envio é obrigatória'),
});

export default function FormDica({ handleSubmit, loading, data }) {
  return (
    <Form onSubmit={handleSubmit} schema={schema} initialData={data}>
      <div className="d-flex align-items-center justify-content-center">
        <ImageInput name="imagem_file" />
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <Input
              type="text"
              className="form-control"
              id="titulo"
              name="titulo"
              aria-describedby="titulo"
              placeholder="Informe o titulo da dica"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <Input
              type="text"
              className="form-control"
              id="link"
              name="link"
              aria-describedby="link"
              placeholder="Informe o Link da dica"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="data_enviar">Data de envio</label>
            <Input
              type="date"
              className="form-control"
              id="data_enviar"
              name="data_enviar"
              aria-describedby="data_enviar"
              placeholder="Informe a data da dica"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="conteudo">Conteúdo</label>
            <Input
              multiline
              type="text"
              className="form-control"
              id="conteudo"
              name="conteudo"
              aria-describedby="conteudo"
              placeholder="Informe o conteúdo da dica"
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
FormDica.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
};

FormDica.defaultProps = {
  data: {},
};
