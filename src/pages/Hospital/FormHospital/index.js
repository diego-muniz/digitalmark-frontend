import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
// import { Container } from './styles';
import PropTypes from 'prop-types';

const schema = Yup.object().shape({
  titulo: Yup.string().required('O titulo é obrigatório'),
  conteudo: Yup.string().required('O conteudo é obrigatório'),
  link: Yup.string().url('O link não é valido'),
  data_enviar: Yup.string().required('A data para envio é obrigatória'),
});

export default function FormHospital({ handleSubmit, loading, data }) {
  return (
    <Form onSubmit={handleSubmit} schema={schema} initialData={data}>
      <div className="row">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="nome">Hospital</label>
            <Input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              aria-describedby="titulo"
              placeholder="Informe o hospital"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ</label>
            <Input
              type="text"
              className="form-control"
              id="cnpj"
              name="cnpj"
              aria-describedby="cnpj"
              placeholder="Informe o CNPJ"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <Input
              type="text"
              className="form-control"
              id="cep"
              name="cep"
              aria-describedby="cep"
              placeholder="Informe o CEP"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="uf">UF</label>
            <Input
              type="text"
              className="form-control"
              id="uf"
              name="uf"
              aria-describedby="uf"
              placeholder="Informe o UF"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="logradouro">Logradouro</label>
            <Input
              type="text"
              className="form-control"
              id="logradouro"
              name="logradouro"
              aria-describedby="logradouro"
              placeholder="Informe o Logradouro"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="localidade">Localidade</label>
            <Input
              type="text"
              className="form-control"
              id="localidade"
              name="localidade"
              aria-describedby="localidade"
              placeholder="Informe a localidade"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="bairro">Bairro</label>
            <Input
              type="text"
              className="form-control"
              id="bairro"
              name="bairro"
              aria-describedby="bairro"
              placeholder="Informe o Bairro"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="complemento">Complemento</label>
            <Input
              type="text"
              className="form-control"
              id="complemento"
              name="complemento"
              aria-describedby="complemento"
              placeholder="Informe o Complemento"
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
FormHospital.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
};

FormHospital.defaultProps = {
  data: {},
};
