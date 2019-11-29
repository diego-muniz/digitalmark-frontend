import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  MdMenu,
  MdBubbleChart,
  MdFolder,
  MdLightbulbOutline,
  MdPanTool,
  MdPeopleOutline,
  MdCloudCircle,
  MdScreenShare,
} from 'react-icons/md';

import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { signOut } from '~/store/modules/auth/actions';

import history from '~/services/history';

import { Wrapper, Sidebar, Content } from './styles';

export default function DefaultLayout({ children }) {
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  async function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Wrapper>
      <Sidebar active={active}>
        <div className="sidebar-header">
          <h3>ForkDreams</h3>
        </div>

        <ul className="list-unstyled component">
          <p>Menu Principal</p>

          <li
            className={classNames({
              active: history.location.pathname === '/dashboard',
            })}
          >
            <Link to="/dashboard">
              <MdBubbleChart />
              &nbsp; Dashboard
            </Link>
          </li>
          <li
            className={classNames({
              active: history.location.pathname === '/categorias',
            })}
          >
            <Link to="/categorias">
              <MdFolder />
              &nbsp; Gerenciar Categorias
            </Link>
          </li>
          <li
            className={classNames({
              active: history.location.pathname === '/dicas',
            })}
          >
            <Link to="/dicas">
              <MdLightbulbOutline />
              &nbsp; Gerenciar Dicas
            </Link>
          </li>
          <li
            className={classNames({
              active: history.location.pathname === '/servicos',
            })}
          >
            <Link to="/servicos">
              <MdPanTool />
              &nbsp; Gerenciar Serviços
            </Link>
          </li>
          <li
            className={classNames({
              active: history.location.pathname === '/usuarios',
            })}
          >
            <Link to="/usuarios">
              <MdPeopleOutline />
              &nbsp; Gerenciar Usuários
            </Link>
          </li>
          <li
            className={classNames({
              active: history.location.pathname === '/sonhos',
            })}
          >
            <Link to="/sonhos">
              <MdCloudCircle />
              &nbsp; Gerenciar Sonhos
            </Link>
          </li>
          <li
            className={classNames({
              active: history.location.pathname.indexOf('cursos') > -1,
            })}
          >
            <a
              href="#pageSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <MdScreenShare />
              &nbsp; Conteúdo
            </a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li
                className={classNames({
                  active: history.location.pathname === '/cursos',
                })}
              >
                <Link to="/cursos">Curso</Link>
              </li>
              <li
                className={classNames({
                  active: history.location.pathname === '/modulos',
                })}
              >
                <Link to="/modulos">Módulos</Link>
              </li>
              <li
                className={classNames({
                  active: history.location.pathname === '/aulas',
                })}
              >
                <Link to="/aulas">Aulas</Link>
              </li>
            </ul>
          </li>
        </ul>
      </Sidebar>
      <Content>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary w-100">
          <div className="container-fluid">
            <button
              type="button"
              id="sidebarCollapse"
              onClick={() => setActive(!active)}
              className="btn btn-primary"
            >
              <MdMenu color="#fff" size="30" />
              &nbsp;
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="btn btn-danger"
            >
              Sair do sistema
            </button>
          </div>
        </nav>
        <div className="container">{children}</div>
      </Content>
    </Wrapper>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
