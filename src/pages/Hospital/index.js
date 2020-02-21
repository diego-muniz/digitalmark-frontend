import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Loading from '~/components/Loading';

import { Container } from './styles';

import api from '~/services/api';

export default function Hospital() {
  const [hospitais, setHospitais] = useState([]);
  const [loading, setLoading] = useState(false);

  async function obterHospitais() {
    try {
      setLoading(true);
      const response = await api.get(`/hospitais`);
      const { data } = response;

      setHospitais(data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obterHospitais();
  }, []);

  async function deletarHospital(hospital) {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      html: `Deletar o hospital ${hospital.nome} será uma ação permanente!`,
      showCloseButton: true,
      showCancelButton: true,
      showClass: {
        popup: 'animated fadeInDown faster',
      },
      hideClass: {
        popup: 'animated fadeOutUp faster',
      },
      focusConfirm: true,
      confirmButtonText: 'Deletar Hospital!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#226cbb',
    }).then(async result => {
      if (result.value) {
        await api.delete(`/hospitais/${hospital.id}`);
        obterHospitais();
        Swal.fire(
          'Deletado!',
          `Hospital ${hospital.nome} deletado com sucesso !`,
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
            <Link to="/hospitais">Hospitais</Link>
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <Link to="hospitais/novo" className="btn btn-primary ">
            Novo Hospital
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
                    <th>Hospital</th>
                    <th>Logradouro</th>
                    <th>CNPJ</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitais.map(hospital => (
                    <tr key={hospital.id}>
                      <td>{hospital.nome}</td>
                      <td>{hospital.logradouro}</td>
                      <td>{hospital.cnpj}</td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/hospitais/${hospital.id}/editar`}
                            className="btn btn-sm btn-primary"
                          >
                            <FaEdit />
                          </Link>
                          <div>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => deletarHospital(hospital)}
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
