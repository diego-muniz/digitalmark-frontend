import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Loading from '~/components/Loading';

import { Container } from './styles';

import api from '~/services/api';

export default function NovoEnfermeiro() {
  const [enfermeiros, setEnfermeiros] = useState([]);
  const [loading, setLoading] = useState(false);

  async function obterEnfermeiros() {
    try {
      setLoading(true);
      const response = await api.get(`/enfermeiros`);
      const { data } = response;
      setEnfermeiros(data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obterEnfermeiros();
  }, []);

  async function deletarEnfermeiro(enfermeiro) {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      html: `Deletar o enfermeiro ${enfermeiro.nome} será uma ação permanente!`,
      showCloseButton: true,
      showCancelButton: true,
      showClass: {
        popup: 'animated fadeInDown faster',
      },
      hideClass: {
        popup: 'animated fadeOutUp faster',
      },
      focusConfirm: true,
      confirmButtonText: 'Deletar Enfermeiro!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#226cbb',
    }).then(async result => {
      if (result.value) {
        await api.delete(`/enfermeiros/${enfermeiro.id}`);
        obterEnfermeiros();
        Swal.fire(
          'Deletado!',
          `Enfermeiro ${enfermeiro.nome} deletada com sucesso !`,
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
            <Link to="/enfermeiros">Enfermeiros</Link>
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <Link to="enfermeiros/novo" className="btn btn-primary ">
            Novo Enfermeiro
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
                    <th>Nome</th>
                    <th>Coren</th>
                    <th>Hospital</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {enfermeiros.map(enfermeiro => (
                    <tr key={enfermeiro.id}>
                      <td>{enfermeiro.nome}</td>
                      <td>{enfermeiro.coren}</td>
                      <td>{enfermeiro.hospital.nome}</td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/enfermeiros/${enfermeiro.id}/editar`}
                            className="btn btn-sm btn-primary"
                          >
                            <FaEdit />
                          </Link>
                          <div>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => deletarEnfermeiro(enfermeiro)}
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
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
