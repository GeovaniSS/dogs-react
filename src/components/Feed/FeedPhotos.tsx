import React from 'react'
import styles from './FeedPhotos.module.css'

import { useAxios } from '../../hooks/useAxios'
import { Photo, PHOTOS_GET } from '../../api'
import { FeedPhotoItem } from './FeedPhotoItem'
import { Error } from '../Helper/Error'
import { Loading } from '../Helper/Loading'

interface FeedPhotosProps {
  onSelectPhoto: (photo: Photo) => void 
}

export const FeedPhotos = ({ onSelectPhoto }: FeedPhotosProps) => {
  const { data, error, loading, request } = useAxios()

  async function fetchPhotos() {
    const { url, options } = PHOTOS_GET({ total: 6, page: 1, user: 0 })
    await request(url, options)
  }

  React.useEffect(() => {
    fetchPhotos()
  }, [])
   
  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (!data) return null
  return (
    <ul className={`${styles.feed} animeLeft`}>
      {data.map((photo: Photo) => (
        <FeedPhotoItem 
          key={photo.id} 
          photo={photo}
          onSelectPhoto={onSelectPhoto}
        />
      ))}
    </ul>
  )
}
