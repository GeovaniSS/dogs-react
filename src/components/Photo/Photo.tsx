import React from 'react';

import { PHOTO_GET } from '../../api';
import { useAxios } from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';

import { PhotoContent } from './PhotoContent';
import { Error } from '../Helper/Error';
import { Loading } from '../Helper/Loading';

export const Photo = () => {
  const { id } = useParams()
  const { data, error, loading, request } = useAxios()

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(Number(id))
    request(url, options)
  }, [])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data) return null
  return ( 
    <section className="container mainContainer">
      <PhotoContent data={data} single={true} />
    </section>
  )
};
