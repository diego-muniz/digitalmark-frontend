import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Loading from '~/components/Loading';

import { Container } from './styles';

import api from '~/services/api';

export default function Aula({ match }) {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(false);

  async function obterAulas() {
    try {
      setLoading(true);
      const response = await api.get(
        `/cursos/${match.params.curso_id}/modulos/${match.params.modulo_id}/aulas`
      );
      const { data } = response;
      setAulas(data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obterAulas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match]);

  async function deletarAula({ id }) {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      html: 'Deletar a aula será uma ação permanente!',
      showCloseButton: true,
      showCancelButton: true,
      showClass: {
        popup: 'animated fadeInDown faster',
      },
      hideClass: {
        popup: 'animated fadeOutUp faster',
      },
      focusConfirm: true,
      confirmButtonText: 'Deletar aula!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#007BFF',
    }).then(async result => {
      if (result.value) {
        await api.delete(
          `/cursos/${match.params.curso_id}/modulos/${match.params.modulo_id}/aulas/${id}`
        );
        obterAulas();
        Swal.fire('Deletado!', 'Seu aula foi deletada com sucesso', 'success');
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
          <li className="breadcrumb-item " aria-current="page">
            <Link to={`/cursos/${match.params.curso_id}/modulos`}>Módulos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Aulas
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <Link
            to={`/cursos/${match.params.curso_id}/modulos/${match.params.modulo_id}/aulas/novo`}
            className="btn btn-primary "
          >
            Novo Aula
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
                    <th>Link</th>
                    <th>Status</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {aulas.map(aula => (
                    <tr key={aula.id}>
                      <td>{aula.id}</td>
                      <td>{aula.nome}</td>
                      <td>
                        <a href={aula.link}> Ver</a>{' '}
                      </td>
                      <td>{aula.status}</td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/cursos/${match.params.curso_id}/modulos/${match.params.modulo_id}/aulas/${aula.id}/editar`}
                            className="btn btn-sm btn-primary"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => deletarAula(aula)}
                          >
                            <FaTrash />
                          </button>
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
Aula.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      curso_id: PropTypes.string,
      modulo_id: PropTypes.string,
    }),
  }),
};

Aula.defaultProps = {
  match: {},
};
