import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaListUl } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';

import { Container } from './styles';

import api from '~/services/api';

export default function Curso() {
  const [cursos, setCursos] = useState([]);
  const [paginationData, setPaginationData] = useState({ page: 1 });
  const [loading, setLoading] = useState(false);

  async function obterCursos(page = 1) {
    try {
      setLoading(true);
      const response = await api.get(`/cursos?page=${page}`);
      const { data } = response;
      setPaginationData({
        page: data.page,
        perPage: data.perPage,
        total: data.total,
        lastPage: data.lastPage,
      });
      setCursos(data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obterCursos();
  }, []);

  async function deletarCurso({ id }) {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      html: 'Deletar a curso será uma ação permanente!',
      showCloseButton: true,
      showCancelButton: true,
      showClass: {
        popup: 'animated fadeInDown faster',
      },
      hideClass: {
        popup: 'animated fadeOutUp faster',
      },
      focusConfirm: true,
      confirmButtonText: 'Deletar curso!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#007BFF',
    }).then(async result => {
      if (result.value) {
        await api.delete(`/cursos/${id}`);
        obterCursos();
        Swal.fire('Deletado!', 'Seu curso foi deletada com sucesso', 'success');
      }
    });
  }

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Curso
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <Link to="cursos/novo" className="btn btn-primary ">
            Novo Curso
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
                    <th>Nome</th>
                    <th>Status</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {cursos.map(curso => (
                    <tr key={curso.id}>
                      <td>{curso.id}</td>
                      <td>{curso.nome}</td>
                      <td>{curso.status}</td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/cursos/${curso.id}/editar`}
                            className="btn btn-sm btn-primary"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => deletarCurso(curso)}
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/cursos/${curso.id}/modulos`}
                            className="btn btn-sm btn-success "
                            title="Ver módulos"
                          >
                            <FaListUl />
                            &nbsp; Ver módulos
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
                onChangePage={p => obterCursos(p)}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
