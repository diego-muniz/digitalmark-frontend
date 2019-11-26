import React from 'react';
import PropTypes from 'prop-types';

import { Container, Sidenav, Content, FormContainer } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Container>
      <Sidenav>
        <div className="login-main-text">
          <h2>
            Fork Dreams <br /> Acesso ao sistema
          </h2>
          <p>Gerenciamento do aplicativo.</p>
        </div>
      </Sidenav>

      <Content>
        <div className="col-md-6 col-sm-12">
          <FormContainer>{children}</FormContainer>
        </div>
      </Content>
    </Container>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
