import React, { useRef } from 'react';
import style from './BlogPost.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';
import { PostItem } from '../../store/slices/postSlyce';
import { RootState } from '../../store/store';

type PostProps = {
  item: PostItem;
  updatePosts: () => void;
  setActiveTag: (tag: string) => void;
};

const Post: React.FC<PostProps> = ({ item, updatePosts, setActiveTag }) => {
  const currentUser = useSelector((state: RootState) => state.auth.data);
  const { tags, title, user, viewsCount, _id, createdAt, imageUrl, comments } = item;
  const divDeleteRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const { data } = await axios.delete(`posts/${_id}`);

        if (data && divDeleteRef.current) {
          divDeleteRef.current.textContent = 'Стаття видалена з бази даних';
        }
        setTimeout(() => updatePosts(), 1000);
      } catch (error) {
        if (divDeleteRef.current) divDeleteRef.current.textContent = 'Не вдалося видалити статтю';
      }
    }
  };

  const editPost = () => {
    navigate(`/blog/${_id}/edit`);
  };
  return (
    <div className={style.root}>
      <div className={style.postImage}>
        <Link to={`/blog/:${_id}`}>
          {imageUrl ? (
            <img src={`http://localhost:4444${imageUrl}`} alt="post theme" />
          ) : (
            <img src="/blog-noImage.jpg" alt="ще нічого не завантажено" />
          )}
        </Link>
      </div>
      <div className={style.avatar}>
        <img
          src={user.avatarUrl ? `http://localhost:4444${user.avatarUrl}` : '/registr_icon.svg'}
          alt=""
        />
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
            <span key={tag} className={style.postTag} onClick={() => setActiveTag(tag)}>
              #{tag}&nbsp;
            </span>
          ))}
        </div>
        <div className={style.postInfo}>
          <div className={style.comments}>
            <img src="/blog-eye.svg" alt="перегляди" />
            <span>{viewsCount}</span>
          </div>
          <div className={style.views}>
            <img src="/blog-message.svg" alt="коментарі" />
            <span>{comments.length}</span>
          </div>
        </div>
      </div>

      {user._id === currentUser?._id ? (
        <div className={style.iconGroup}>
          <FontAwesomeIcon icon={faPencil} onClick={editPost} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={deletePost} />
        </div>
      ) : (
        ''
      )}
      <div ref={divDeleteRef} className={style.deleteMessage}></div>
    </div>
  );
};

export default Post;
