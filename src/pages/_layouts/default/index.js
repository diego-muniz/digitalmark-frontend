import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MdMenu, MdLocalHospital, MdBusiness } from 'react-icons/md';

import { Link } from 'react-router-dom';

import classNames from 'classnames';

import history from '~/services/history';

import { Wrapper, Sidebar, Content } from './styles';

export default function DefaultLayout({ children }) {
  const [active, setActive] = useState(false);

  return (
    <Wrapper>
      <Sidebar active={active}>
        <div className="sidebar-header">
          <h3>Digital Mark</h3>
        </div>

        <ul className="list-unstyled component">
          <li
            className={classNames({
              active: history.location.pathname === '/enfermeiros',
            })}
          >
            <Link to="/enfermeiros">
              <MdLocalHospital />
              &nbsp; Enfermeiros
            </Link>
          </li>
          <li
            className={classNames({
              active: history.location.pathname === '/hospitais',
            })}
          >
            <Link to="/hospitais">
              <MdBusiness />
              &nbsp; Hospitais
            </Link>
          </li>
        </ul>
      </Sidebar>
      <Content>
        <nav className="navbar navbar-expand-lg navbar-light darkBlue w-100">
          <div className="container-fluid">
            <button
              type="button"
              id="sidebarCollapse"
              onClick={() => setActive(!active)}
              className="btn darkBlue"
            >
              <MdMenu color="#fff" size="30" />
              &nbsp;
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
