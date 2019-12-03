import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';

import { Container } from './styles';

import api from '~/services/api';

export default function Servico() {
  const [servicos, setServicos] = useState([]);
  const [paginationData, setPaginationData] = useState({ page: 1 });
  const [loading, setLoading] = useState(false);

  async function obterServicos(page = 1) {
    try {
      setLoading(true);
      const response = await api.get(`/servicos?page=${page}`);
      const { data } = response;
      setPaginationData({
        page: data.page,
        perPage: data.perPage,
        total: data.total,
        lastPage: data.lastPage,
      });
      setServicos(data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obterServicos();
  }, []);

  async function deletarServico({ id }) {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      html: 'Deletar a serviço será uma ação permanente!',
      showCloseButton: true,
      showCancelButton: true,
      showClass: {
        popup: 'animated fadeInDown faster',
      },
      hideClass: {
        popup: 'animated fadeOutUp faster',
      },
      focusConfirm: true,
      confirmButtonText: 'Deletar servico!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#007BFF',
    }).then(async result => {
      if (result.value) {
        await api.delete(`/servicos/${id}`);
        obterServicos();
        Swal.fire(
          'Deletado!',
          'Seu serviço foi deletada com sucesso',
          'success'
        );
      }
    });
  }

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Serviço
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <Link to="servicos/novo" className="btn btn-primary ">
            Novo Serviço
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
                  {servicos.map(servico => (
                    <tr key={servico.id}>
                      <td>{servico.id}</td>
                      <td>{servico.titulo}</td>
                      <td>
                        <a href={servico.link}>Ver</a>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/servicos/${servico.id}/editar`}
                            className="btn btn-sm btn-primary"
                          >
                            <FaEdit />
                          </Link>
                          <div>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => deletarServico(servico)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={paginationData.page}
                totalPages={paginationData.total / paginationData.perPage}
                onChangePage={p => obterServicos(p)}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
