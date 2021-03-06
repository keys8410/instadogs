import React from 'react';
import { COMMENT_POST } from '../../api';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helpers/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = React.useState('');

  const { error, loading, request } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = window.localStorage.getItem('token');
    const { url, options } = COMMENT_POST(id, { comment }, token);

    const { res, json } = await request(url, options);

    if (res.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
  };

  return (
    <>
      {loading ? (
        <form
          className={`${styles.form} ${single ? styles.single : ''}`}
          onSubmit={handleSubmit}
        >
          <textarea
            className={styles.textarea}
            id="comment"
            name="comment"
            placeholder="Comente..."
            disabled
          />
          <button className={styles.button} disabled>
            <Enviar />
          </button>
          <Error error={error} />
        </form>
      ) : (
        <form
          className={`${styles.form} ${single ? styles.single : ''}`}
          onSubmit={handleSubmit}
        >
          <textarea
            className={styles.textarea}
            id="comment"
            name="comment"
            placeholder="Comente..."
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button className={styles.button}>
            <Enviar />
          </button>

          <Error error={error} />
        </form>
      )}
    </>
  );
};

export default PhotoCommentsForm;
