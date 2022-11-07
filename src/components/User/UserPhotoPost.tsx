import React, { ChangeEvent, FormEvent } from 'react';
import styles from './UserPhotoPost.module.css';

import { useAxios } from '../../hooks/useAxios';
import { useForm } from '../../hooks/useForm';

import { Button } from '../Forms/Button';
import { Input } from '../Forms/Input';
import { Error } from '../Helper/Error';

import { PHOTO_POST } from '../../api';
import { useNavigate } from 'react-router-dom';

interface Img {
  raw: File,
  url: string
}

export const UserPhotoPost = () => {
  const name = useForm('name');
  const weight = useForm('weight');
  const age = useForm('age');
  const [img, setImg] = React.useState<Img>(null!);
  const navigate = useNavigate()

  const { data, loading, error, request } = useAxios();

  React.useEffect(() => {
    if (data) navigate("/account")
  }, [data, navigate])

  async function handlePhotoPost(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img?.raw);
    formData.append('nome', name.value);
    formData.append('peso', weight.value);
    formData.append('idade', age.value);

    if (name.validate() && weight.validate() && age.validate()) {
      const token = localStorage.getItem('token') as string;
      const { url, options } = PHOTO_POST(token, formData);
      await request(url, options);
    }
  }

  function handlePhotoUploadChange({ target }: ChangeEvent<HTMLInputElement>) {    
    const files = target.files as FileList

    setImg({
      raw: files[0],
      url: URL.createObjectURL(files[0]),
    });
  }

  return (
    <section className={`animeLeft ${styles.photoPost}`}>
      <form onSubmit={handlePhotoPost}>
        <Input
          label="Nome"
          id="nome"
          value={name.value}
          onChange={name.onChange}
          onBlur={name.onBlur}
          error={name.error}
        />
        <Input
          label="Peso"
          id="peso"
          type="number"
          value={weight.value}
          onChange={weight.onChange}
          onBlur={weight.onBlur}
          error={weight.error}
        />
        <Input
          label="Idade"
          id="idade"
          type="number"
          value={age.value}
          onChange={age.onChange}
          onBlur={age.onBlur}
          error={age.error}
        />
        <input
          type="file"
          name="img"
          id="img"
          className={styles.file}
          onChange={handlePhotoUploadChange}
        />
        <Button disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
        <Error error={error} />
      </form>
      <div>
        {img?.url && (
          <div
            style={{ backgroundImage: `url('${img.url}')` }}
            className={styles.preview}
          />
        )}
      </div>
    </section>
  );
};
