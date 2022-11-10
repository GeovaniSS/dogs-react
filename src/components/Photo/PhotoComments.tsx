import React from 'react';
import styles from './PhotoComments.module.css';

import { Comment } from '../../api';
import { PhotoCommentsForm } from './PhotoCommentsForm';
import UserContext from '../../UserContext';

interface PhotoCommentsProps {
  id: number;
  comments: Comment[];
  single: boolean;
}

export const PhotoComments = ({ single, ...props }: PhotoCommentsProps) => {
  const { login } = React.useContext(UserContext)
  const [comments, setComments] = React.useState<Comment[]>(() => props.comments);
  const commentRef = React.useRef<HTMLUListElement>(null!)
  
  React.useEffect(() => {
    commentRef.current.scrollTop = commentRef.current.scrollHeight
  }, [comments])

  function addNewComment(newComment: Comment) {
    setComments([...comments, newComment])
  }

  return (
    <>
      <ul className={`${styles.comments} ${single ? styles.single : ""}`} ref={commentRef}>
        {comments.map(({ comment_author, comment_content, comment_ID }) => (
          <li key={comment_ID}>
            <p>
              <strong>{comment_author}</strong>: {comment_content}
            </p>
          </li>
        ))}
      </ul>
      { login && <PhotoCommentsForm id={props.id} onAddNewComment={addNewComment} single={single}/> }
    </>
  );
};
