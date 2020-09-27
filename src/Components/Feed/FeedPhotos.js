import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import styles from './FeedPhotos.module.css';

const FeedPhotos = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const fetchPhotos = async () => {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });

      const { json } = await request(url, options);

      console.log(json);
    };

    fetchPhotos();
  }, [request]);
  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`animeLeft ${styles.feed}`}>
        {data &&
          data.map((photo) => <FeedPhotosItem key={photo.id} photo={photo} />)}
      </ul>
    );
  else return null;
};

export default FeedPhotos;