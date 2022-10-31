import React from 'react'
import { Photo } from '../../api'

import { FeedModal } from './FeedModal'
import { FeedPhotos } from './FeedPhotos'

export const Feed = () => {
  const [modalPhoto, setModalPhoto] = React.useState<Photo | null>(null)

  function selectPhoto(photo: Photo) {
    setModalPhoto(photo)
  }

  function closeModal() {
    setModalPhoto(null)
  }

  return (
    <>
      { modalPhoto && <FeedModal photo={modalPhoto} onCloseModal={closeModal} /> }
      <FeedPhotos onSelectPhoto={selectPhoto}/>
    </>
  )
}
