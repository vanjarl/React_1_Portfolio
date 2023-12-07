import React from 'react';
import style from './BlogPost.module.scss';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const Post = ({ item }) => {
  const { tags, title, user, viewsCount, _id, createdAt } = item;

  return (
    <div className={style.root}>
      <div className={style.postImage}>
        <img src="/morning.jpg" alt="" />
      </div>
      <div className={style.avatar}>
        <img src="/logo.png" alt="аватар користувача" />
      </div>
      <div className={style.author}>
        <div className={style.postAuthorName}>{user.fullName}</div>
        <div className={style.postAuthorDate}>{formatDate(createdAt)}</div>
      </div>
      <div className={style.postData}>
        <Link to={`/blog/:${_id}`}>
          <div className={style.postTitle}>{title}</div>
        </Link>
        <div className={style.postTags}>
          {tags.map((tag, i) => (
            <span key={tag}>#{tag}&nbsp;</span>
          ))}
        </div>
        <div className={style.postInfo}>
          <div className={style.comments}>
            <img src="/blog-eye.svg" alt="" />
            <span>{viewsCount}</span>
          </div>
          <div className={style.views}>
            <img src="/blog-message.svg" alt="" />
            <span>30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
