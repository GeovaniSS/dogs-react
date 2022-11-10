import React from 'react';
import styles from './PhotoContent.module.css'

import { Comment, Photo } from '../../api';
import { Link } from 'react-router-dom';
import { PhotoComments } from './PhotoComments';
import UserContext from '../../UserContext';
import { PhotoDelete } from './PhotoDelete';
import { Image } from '../Helper/Image';

interface PhotoContentProps {
  single: boolean
  data: {
    photo: Photo
    comments: Comment[]
  }
}

export const PhotoContent = ({ single, data: { photo, comments } }: PhotoContentProps) => {
  const { user } = React.useContext(UserContext)

  return (
    <div className={`${styles.photo} ${single ? styles.single : ""}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <p className={styles.author}>
          { user && user.username === photo.author ? 
            <PhotoDelete id={photo.id} />
            : 
            <Link to={`/profile/${photo.author}`}>@{photo.author}</Link>
          }
          <span className={styles.stats}>{photo.acessos}</span>
        </p>
        <h1 className="title">
          <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
        </h1>
        <ul className={styles.attributes}>
          <li>{photo.peso} kg</li>
          <li>{photo.idade} anos</li>
        </ul>
      </div> 
      <PhotoComments id={photo.id} comments={comments} single={single}/>
    </div>
  );
};
