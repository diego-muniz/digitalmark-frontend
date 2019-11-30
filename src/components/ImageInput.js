import styled from 'styled-components';

import React, { useState, useRef, useEffect } from 'react';

import { useField } from '@rocketseat/unform';

import api from '~/services/api';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    height: 240px;

    &:hover {
      opacity: 0.7;
    }

    img {
      min-height: 240px;
      min-width: 240px;
      max-height: 240px;
      max-width: 240px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;

export default function ImageInput() {
  const { defaultValue, registerField } = useField('imagem_file');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(
    'https://via.placeholder.com/728.png?text=Adicionar+Imagem'
  );
  // console.log(defaultValue.url);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'imagem_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); // eslint-disable-line

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue.url);
    }
  }, [defaultValue]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="imagem_id">
        <img src={preview} alt="" />

        <input
          type="file"
          id="imagem_id"
          accept="image/*"
          data-file={file}
          ref={ref}
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}
