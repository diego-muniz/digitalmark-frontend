import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Loading from '~/components/Loading';
import api from '~/services/api';
import { formataDinheiro } from '~/services/helpers';

export default function DetalhaSonho({ match }) {
  const [sonho, setSonho] = useState({});
  const [logs, setLogs] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  useEffect(() => {
    async function getSonho() {
      try {
        setLoadingPage(true);
        const response = await api.get(`/sonhos/${match.params.id}`);
        const { data } = response;

        // eslint-disable-next-line prefer-destructuring
        console.log(data);
        setSonho(data);
        setLogs(data.logs);
        setComentarios(data.comentarios);
      } catch (error) {
        setLoadingPage(false);
      } finally {
        setLoadingPage(false);
      }
    }
    getSonho();
  }, [match.params.id]);
  return (
    <Container>
      <div className="card mt-5">
        <div className="card-header">Logs</div>
        <div className="card-body table-responsive">
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{formataDinheiro(log.quantia / 100)}</td>
                  <td>{new Date(log.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-header">Comentários</div>
        <div className="card-body table-responsive">
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Comentario</th>
              </tr>
            </thead>
            <tbody>
              {comentarios.map(comentario => (
                <tr key={comentario.id}>
                  <td>{comentario.comentario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

DetalhaSonho.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

DetalhaSonho.defaultProps = {
  match: {},
};
