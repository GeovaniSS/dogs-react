import React, {MouseEvent} from 'react'
import styles from './FeedModal.module.css'

import { PHOTO_GET } from '../../api'
import { useAxios } from '../../hooks/useAxios'
import { Error } from '../Helper/Error'
import { Loading } from '../Helper/Loading'
import { PhotoContent } from '../Photo/PhotoContent'

interface FeedModalProps {
  id: number
  onCloseModal: () => void
}

export const FeedModal = ({ id, onCloseModal }: FeedModalProps) => {
  const { data, loading, error, request } = useAxios()
  
  React.useEffect(() => {
    async function fetchModalPhoto() {
      const { url, options } = PHOTO_GET(id)
      await request(url, options)
    }
    fetchModalPhoto()
  }, [id])

  function handleOutsideClick({target, currentTarget}: MouseEvent<HTMLDivElement>) {
    if (target === currentTarget) onCloseModal()
  }
  
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      { loading && <Loading /> }
      { error && <Error error={error} /> }
      { data && <PhotoContent data={data} single={false} /> }
    </div>
  )
}
