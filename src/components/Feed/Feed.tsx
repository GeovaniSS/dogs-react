import React from 'react'

import { Photo } from '../../api'
import { FeedModal } from './FeedModal'
import { FeedPhotos } from './FeedPhotos'

interface FeedProps {
  user?: number | string
}

export const Feed = ({ user = 0 }: FeedProps) => {
  const [pages, setPages] = React.useState<number[]>([1])
  const [modalPhoto, setModalPhoto] = React.useState<Photo | null>(null)
  const [infinite, setInfinite] = React.useState(true)

  function selectPhoto(photo: Photo) {
    setModalPhoto(photo)
  }

  function closeModal() {
    setModalPhoto(null)
  }

  function stopInfiniteScroll() {
    setInfinite(false)
  }

  React.useEffect(() => {
    let wait = false

    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY
        const height = document.body.offsetHeight - window.innerHeight
        const isFeedBottomAlmostReached = scroll > 0.75 * height
        
        if (isFeedBottomAlmostReached && !wait) {
          setPages(pages => [...pages, pages.length + 1])
          wait = true
          setTimeout(() => wait = false, 500)
        }
      }
    }

    window.addEventListener('scroll', infiniteScroll)
    window.addEventListener('whell', infiniteScroll)

    return () => {
      window.removeEventListener('scroll', infiniteScroll)
      window.removeEventListener('whell', infiniteScroll)
    }
  }, [infinite])

  return (
    <>
      { modalPhoto && <FeedModal id={modalPhoto.id} onCloseModal={closeModal} /> }
      { pages.map(page => (
        <FeedPhotos 
          key={page} 
          page={page} 
          user={user} 
          onSelectPhoto={selectPhoto}
          onStopInfiniteScroll={stopInfiniteScroll}
        />
      ))}
    </>
  )
}
