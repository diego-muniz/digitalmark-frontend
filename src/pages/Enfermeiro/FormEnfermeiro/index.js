import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
// import { Container } from './styles';
import PropTypes from 'prop-types';
import api from '~/services/api';

const schema = Yup.object().shape({
  titulo: Yup.string().required('O titulo é obrigatório'),
  conteudo: Yup.string().required('O conteudo é obrigatório'),
  link: Yup.string().url('O link não é valido'),
  data_enviar: Yup.string().required('A data para envio é obrigatória'),
});

export default function FormEnfermeiro({ handleSubmit, loading, data }) {
  const [searchResult, setResult] = useState([]);

  function obterHospitais(event) {
    const delay = 1000;
    const [key, value] = [event.key, event.target.value];
    if (window.waitSearch !== undefined) {
      clearTimeout(window.waitSearch);
    }
    window.waitSearch = setTimeout(() => {
      try {
        (async () => {
          const resp = await api.get(`/hospitais-pornome?hospital=${value}`);
          console.log(resp.data);
          setResult(resp.data);
        })();
      } catch (e) {
        console.error(e);
      }
      // setShowAlert(false);
    }, delay);
    if ((value !== '' && key.length === 1) || key == 'Enter') {
    } else {
      clearTimeout(window.waitSearch);
      // setShowAlert(false);
      setResult([]);
    }
  }

  async function handleHospital(hospital) {
    console.log(hospital);

    // data.hospital = hospital.nome;
  }

  async function obterEndereco(cep) {
    cep = cep.target.value;
    if (cep.length === 8) {
      cep = cep.replace('-', '');
      const resp = await api.get(`/buscarcep/${cep}`);
      const { data } = resp;
      console.log(data);
    }
  }

  return (
    <Form onSubmit={handleSubmit} schema={schema} initialData={data}>
      <div className="row">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <Input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              aria-describedby="titulo"
              placeholder="Informe o seu nome"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <Input
              type="text"
              className="form-control"
              id="cpf"
              name="cpf"
              aria-describedby="cpf"
              placeholder="Informe o seu CPF"
              onKeyUp={e => obterEndereco(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="data_nascimento">Data Nascimento</label>
            <Input
              type="date"
              className="form-control"
              id="data_nascimento"
              name="data_nascimento"
              aria-describedby="data_nascimento"
              placeholder="Informe a data de nascimento"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="coren">COREN</label>
            <Input
              type="text"
              className="form-control"
              id="coren"
              name="coren"
              aria-describedby="coren"
              placeholder="Informe o COREN"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="hospital">Hospital</label>
            <Input
              type="text"
              className="form-control"
              id="hospital"
              name="hospital"
              aria-describedby="titulo"
              placeholder="Informe o hospital"
              autoComplete="off"
              onKeyUp={e => obterHospitais(e)}
            />
          </div>
          <div className="search-data-list show">
            {searchResult &&
              searchResult.map(hospital => (
                <li key={hospital.id} className="d-flex">
                  <div
                    onClick={() => handleHospital(hospital)}
                    className="search-title"
                  >
                    <span>&nbsp;{hospital.nome}</span>
                    {/* <p className="search-duration hide ml-1">
                        {hospital.cep}
                      </p> */}
                  </div>
                </li>
              ))}
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
              autoComplete="off"
              onKeyUp={e => obterEndereco(e)}
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
FormEnfermeiro.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
};

FormEnfermeiro.defaultProps = {
  data: {},
};
