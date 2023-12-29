import React from 'react';
import Skeleton from 'react-loading-skeleton';
import style from './SkeletonBlog.module.scss';

const SkeletonBlog: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.postImage}>
        <Skeleton height="100%" borderRadius="5%" />
      </div>
      <div className={style.avatar}>
        <Skeleton borderRadius="50%" height="100%" />
      </div>
      <div className={style.author}>
        <div className={style.postAuthorName}>
          <Skeleton width="65px" />
        </div>
        <div className={style.postAuthorDate}>
          <Skeleton width="90px" />
        </div>
      </div>
      <div className={style.postData}>
        <div className={style.postTitle}>
          <Skeleton />
        </div>

        <div className={style.postTags}>
          <Skeleton width="40px" count={3} inline={true} className={style.tagSkeleton} />
        </div>
        <div className={style.postInfo}>
          <div className={style.comments}>
            <Skeleton width="30px" />
          </div>
          <div className={style.views}>
            <Skeleton width="30px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBlog;
