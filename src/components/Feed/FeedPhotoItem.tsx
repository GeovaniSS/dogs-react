import styles from './FeedPhotoItem.module.css'

import { Photo } from '../../api';

interface FeedPhotoItemProps {
  photo: Photo
  onSelectPhoto: (photo: Photo) => void
}

export const FeedPhotoItem = ({photo, onSelectPhoto}: FeedPhotoItemProps) => {
  function handleSelectPhoto() {
    onSelectPhoto(photo)
  }

  return (
    <li className={styles.photo} onClick={handleSelectPhoto}>
      <img src={photo.src} alt={photo.title} />
      <span className={styles.stats}>{photo.acessos}</span>
    </li>
  );
};
