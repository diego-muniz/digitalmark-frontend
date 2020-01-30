import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Loading from '~/components/Loading';
import PaginationComponent from '~/components/Pagination';

import { Container } from './styles';

import api from '~/services/api';
import { formataDinheiro } from '~/services/helpers';

export default function Sonho() {
  const [sonhos, setSonhos] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorAtual, setValorAtual] = useState(0);
  const [paginationData, setPaginationData] = useState({ page: 1 });
  const [loading, setLoading] = useState(false);

  async function obterSonhos(page = 1) {
    try {
      setLoading(true);
      const response = await api.get(`/sonhos?page=${page}`);
      const { data } = response;
      console.log(data);
      setPaginationData({
        page: data.sonhos.page,
        perPage: data.sonhos.perPage,
        total: data.sonhos.total,
        lastPage: data.sonhos.lastPage,
      });
      setSonhos(data.sonhos.data);
      setValorAtual(formataDinheiro(data.valor_atual / 100));
      setValorTotal(formataDinheiro(data.valor_total / 100));
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obterSonhos();
  }, []);

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Sonho
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <span>Somatório Valor Total: {valorTotal}</span>
          <br />
          <span>Somatório Valor Guardado: {valorAtual}</span>
        </div>
        <div className="card-body table-responsive">
          {loading ? (
            <Loading />
          ) : (
            <>
              <table className="table table-responsive table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Vlr Total</th>
                    <th>Vlr Atual</th>
                    <th>Uf</th>
                    <th>Municipio</th>
                    <th>Email usuário</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {sonhos.map(sonho => {
                    const { user } = sonho;
                    return (
                      <tr key={sonho.id}>
                        <td>{sonho.id}</td>
                        <td>{sonho.nome}</td>
                        <td>{formataDinheiro(sonho.valor_total / 100)}</td>
                        <td>{formataDinheiro(sonho.valor_atual / 100)}</td>
                        <td>{user.uf.sigla}</td>
                        <td>{user.municipio.nome}</td>
                        <td>{user.email}</td>
                        <td>
                          <div className="btn-group">
                            <Link
                              to={`/sonhos/${sonho.id}`}
                              className="btn btn-sm btn-primary"
                            >
                              <FaEye />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <PaginationComponent
                currentPage={paginationData.page}
                totalPages={paginationData.total / paginationData.perPage}
                onChangePage={p => obterSonhos(p)}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
