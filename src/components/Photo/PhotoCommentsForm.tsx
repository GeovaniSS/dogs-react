import React, { ChangeEvent, FormEvent } from 'react';
import styles from './PhotoCommentsForm.module.css'

import { Comment, COMMENT_POST } from '../../api';
import { useAxios } from '../../hooks/useAxios';
import { Send } from '../Svgs/Send';
import { Error } from '../Helper/Error';

interface PhotoCommentsFormProps {
  id: number
  onAddNewComment: (newComment: Comment) => void
  single: boolean
}

export const PhotoCommentsForm = ({ id, single, onAddNewComment }: PhotoCommentsFormProps) => {
  const [newCommentText, setNewCommentText] = React.useState('');
  const { error, request } = useAxios();

  async function handleCommentSubmit(event: FormEvent) {
    event.preventDefault();
    const token = localStorage.getItem('token') as string
    const { url, options } = COMMENT_POST({
      id,
      token,
      comment: newCommentText,
    });
    const { response, data } = await request(url, options)
    if (response.status) {
      onAddNewComment(data)
      setNewCommentText('');
    }
  }

  function handleNewCommentTextChange({target}: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(target.value);
  }

  return (
    <form className={`${styles.commentForm} ${single ? styles.single: ""}`} onSubmit={handleCommentSubmit}>
      <textarea
        placeholder="Comente..."
        className={styles.textarea}
        value={newCommentText}
        onChange={handleNewCommentTextChange}
      />
      <button className={styles.send}>
        <Send />
      </button>
      <Error error={error} />
    </form>
  );
};
