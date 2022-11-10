import React from 'react'
import styles from './FeedPhotos.module.css'

import { useAxios } from '../../hooks/useAxios'
import { Photo, PHOTOS_GET } from '../../api'

import { Error } from '../Helper/Error'
import { Loading } from '../Helper/Loading'
import { FeedPhotoItem } from './FeedPhotoItem'

interface FeedPhotosProps {
  page: number
  user: number | string
  onSelectPhoto: (photo: Photo) => void 
  onStopInfiniteScroll: () => void 
}

export const FeedPhotos = ({ page, user, onSelectPhoto, onStopInfiniteScroll }: FeedPhotosProps) => {
  const { data, error, loading, request } = useAxios()

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6
      const { url, options } = PHOTOS_GET({ total, page: page, user: user})
      const { response, data} = await request(url, options)
      if (response.status && data.length < total) onStopInfiniteScroll()
    }

    fetchPhotos()
  }, [user, page])
   
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
