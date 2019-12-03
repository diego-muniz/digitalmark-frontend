import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaListUl } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Loading from '~/components/Loading';

import { Container } from './styles';

import api from '~/services/api';

export default function Modulo({ match }) {
  const [modulos, setModulos] = useState([]);
  const [curso, setCurso] = useState([]);
  const [loading, setLoading] = useState(false);

  async function obterModulos() {
    try {
      setLoading(true);
      const response = await api.get(`/cursos/${match.params.curso_id}`);
      const { data } = response;

      setCurso(data);
      setModulos(data.modulos);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obterModulos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match]);

  async function deletarModulo({ id }) {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      html: 'Deletar a modulo será uma ação permanente!',
      showCloseButton: true,
      showCancelButton: true,
      showClass: {
        popup: 'animated fadeInDown faster',
      },
      hideClass: {
        popup: 'animated fadeOutUp faster',
      },
      focusConfirm: true,
      confirmButtonText: 'Deletar modulo!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#007BFF',
    }).then(async result => {
      if (result.value) {
        await api.delete(`/cursos/${curso.id}/modulos/${id}`);
        obterModulos();
        Swal.fire(
          'Deletado!',
          'Seu modulo foi deletada com sucesso',
          'success'
        );
      }
    });
  }

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/cursos">Cursos</Link>
          </li>
          <li className="breadcrumb-item active " aria-current="page">
            {curso.nome}
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <Link to="modulos/novo" className="btn btn-primary ">
            Novo Modulo
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
                  {modulos.map(modulo => (
                    <tr key={modulo.id}>
                      <td>{modulo.id}</td>
                      <td>{modulo.nome}</td>
                      <td>{modulo.status}</td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/cursos/${match.params.curso_id}/modulos/${modulo.id}/editar`}
                            className="btn btn-sm btn-primary"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => deletarModulo(modulo)}
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/cursos/${curso.id}/modulos/${modulo.id}/aulas`}
                            className="btn btn-sm btn-success "
                            title="Ver aulas"
                          >
                            <FaListUl />
                            &nbsp; Ver aulas
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
Modulo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      curso_id: PropTypes.string,
    }),
  }),
};

Modulo.defaultProps = {
  match: {},
};
