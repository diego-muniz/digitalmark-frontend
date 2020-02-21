import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  .dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
`;
export const Sidebar = styled.nav`
  min-width: 250px;
  max-width: 250px;
  background: ${darken(0.1, '#25528f')};
  color: #fff;
  transition: all 0.3s;

  min-height: 100vh;

  a[data-toggle='collapse'] {
    position: relative;
  }
  .sidebar-header {
    padding: 20px;
    background: #25528f;
    border: 1px solid #1b3b66;
  }
  ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
  }

  ul p {
    color: #fff;
    padding: 10px;
  }

  ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
  }
  ul li a:hover {
    color: ${darken(0.2, '#25528f')};
    background: #fff;
  }

  a {
    color: #b0b2ff;
  }
  ul li.active > a,
  a[aria-expanded='true'] {
    color: #fff;
    background: #25528f;
  }
  ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: ${darken(0.1, '#226cbb')};
  }

  ${props =>
    props.active &&
    css`
      margin-left: -250px;
  }
    `}

  @media (max-width: 768px) {
    & {
      margin-left: -250px;
    }

    ${props =>
      props.active &&
      css`
      margin-left: 0 !important;
  }
    `}
  }
`;
export const Content = styled.div`
  .darkBlue {
    background: #1b3b66;
  }
  width: 100%;
  nav {
    padding: 19px;
  }
`;
