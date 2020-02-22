import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { Container } from './styles';
import api from '~/services/api';

// const schema = Yup.object().shape({
// nome: Yup.string().required('O nome é obrigatório'),
// conteudo: Yup.string().required('O conteudo é obrigatório'),
// link: Yup.string().url('O link não é valido'),
// data_enviar: Yup.string().required('A data para envio é obrigatória'),
// });

export default function FormHospital({ handleSubmit, loading, data }) {
  const [searchResult, setResult] = useState([]);
  const [values, setValues] = useState({});
  const [showOrHide, setShowOrHide] = useState('hide');
  const [hospitalId, setHospitalId] = useState({});

  function obterHospitais(event) {
    const delay = 500;
    const [key, value] = [event.key, event.target.value];
    if (window.waitSearch !== undefined) {
      clearTimeout(window.waitSearch);
    }
    window.waitSearch = setTimeout(() => {
      try {
        (async () => {
          const resp = await api.get(
            `/hospitais-pornome?hospital=${value.toLowerCase()}`
          );
          console.log(resp.data);
          setResult(resp.data);
        })();
      } catch (e) {
        console.error(e);
      }
    }, delay);
    if (
      (value !== '' && key.length === 1) ||
      key == 'Enter' ||
      key === 'Backspace'
    ) {
    } else {
      clearTimeout(window.waitSearch);
      setResult([]);
    }
  }

  function handleHospital(hospital) {
    console.log(hospital);
    setValues({ ...hospital });
    setHospitalId({ hospitalId: hospital.id });
  }

  async function obterEndereco(cep) {
    cep = cep.target.value;
    if (cep.length === 8) {
      cep = cep.replace('-', '');
      const respend = await api.get(`/buscarcep/${cep}`);
      const { data } = respend;
      if (data.success) {
        setValues({
          uf: data.data.uf,
          logradouro: data.data.logradouro,
          localidade: data.data.localidade,
          bairro: data.data.bairro,
          complemento: data.data.complemento,
        });
      }
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={data}>
        <div className="row">
          <div className="col-md-3 search-bar">
            <div className="form-group">
              <label htmlFor="nome">Hospital</label>
              <Input
                type="text"
                className="search-Input form-control"
                id="nome"
                name="nome"
                aria-describedby="titulo"
                placeholder="Informe o hospital"
                autoComplete="off"
                value={values.nome}
                onChange={e => setValues({ nome: e.target.value })}
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
                value={values.cnpj}
                onChange={e => setValues({ cnpj: e.target.value })}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <Input
                type="text"
                className="form-control hide"
                id="hospitalId"
                name="hospitalId"
                aria-describedby="hospitalId"
                readOnly
                placeholder="Informe o CNPJ"
                value={hospitalId.hospitalId}
                onChange={e => setValues({ hospitalId: e.target.value })}
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
                value={values.cep}
                onChange={e => setValues({ cep: e.target.value })}
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
                value={values.uf}
                onChange={e => setValues({ uf: e.target.value })}
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
                value={values.logradouro}
                onChange={e => setValues({ logradouro: e.target.value })}
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
                value={values.localidade}
                onChange={e => setValues({ localidade: e.target.value })}
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
                value={values.bairro}
                onChange={e => setValues({ bairro: e.target.value })}
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
                value={values.complemento}
                onChange={e => setValues({ complemento: e.target.value })}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {loading ? 'Carregando...' : 'Enviar'}
        </button>
      </Form>
    </Container>
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
