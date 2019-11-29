import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';

import { Container } from './styles';

import api from '~/services/api';

export default function Dica() {
  const [dicas, setDicas] = useState([]);
  const [paginationData, setPaginationData] = useState({ page: 1 });
  const [loading, setLoading] = useState(false);

  async function obterDicas(page = 1) {
    try {
      setLoading(true);
      const response = await api.get(`/dicas?page=${page}`);
      const { data } = response;
      setPaginationData({
        page: data.page,
        perPage: data.perPage,
        total: data.total,
        lastPage: data.lastPage,
      });
      setDicas(data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obterDicas();
  }, []);

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Dica
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <Link to="dicas/nova" className="btn btn-primary ">
            Nova Dica
          </Link>
        </div>
        <div className="card-body table-responsive">
          {loading ? (
            <Loading />
          ) : (
            <>
              <table className="table  table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Título</th>
                    <th>Link</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {dicas.map(dica => (
                    <tr key={dica.id}>
                      <td>{dica.id}</td>
                      <td>{dica.titulo}</td>
                      <td>
                        <a href={dica.link}>Ver</a>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/dicas/${dica.id}/editar`}
                            className="btn btn-sm btn-primary"
                          >
                            <FaEdit />
                          </Link>
                          <Link to="/" className="btn btn-sm btn-danger">
                            <FaTrash />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={paginationData.page}
                totalPages={paginationData.total / paginationData.perPage}
                onChangePage={p => obterDicas(p)}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
