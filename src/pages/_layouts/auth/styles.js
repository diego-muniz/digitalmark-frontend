import styled from 'styled-components';

export const Container = styled.div``;
export const Sidenav = styled.aside`
  height: 100%;
  background-color: #007bff;
  overflow-x: hidden;
  padding-top: 20px;
  div {
    margin-top: 20%;
    padding: 60px;
    color: #fff;
    h2 {
      font-weight: 300;
    }
  }

  @media screen and (max-height: 450px) {
    & {
      padding-top: 15px;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      width: 40%;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
    }
  }
`;
export const Content = styled.div`
  padding: 0px 10px;

  @media screen and (min-width: 768px) {
    & {
      margin-left: 40%;
    }
  }
`;

export const FormContainer = styled.div`
  @media screen and (max-width: 450px) {
    & {
      margin-top: 10%;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      margin-top: 60%;
    }
  }
`;
