import styled from 'styled-components';
import ReactLoading from 'react-loading';

import React from 'react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <Container>
      <h2 className="text-primary">Carregando</h2>
      <ReactLoading type="spin" color="#007bff" height="10%" width="10%" />
    </Container>
  );
}
