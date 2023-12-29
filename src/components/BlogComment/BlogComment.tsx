import React, { useRef, useState } from 'react';
import style from './BlogComment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from '../../utils/axios';
import formatDate from '../../utils/formatDate';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Comment } from '../../store/slices/postSlyce';

type BlogCommentProps = {
  postId: string;
  comment: Comment;
};

const BlogComment: React.FC<BlogCommentProps> = ({ comment, postId }) => {
  const userData = useSelector((state: RootState) => state.auth.data);
  const deleteMessageRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteComment = async (commentId: string) => {
    try {
      const { data } = await axios.delete(`/posts/${postId}/comment/${commentId}`);
      if (data && deleteMessageRef.current)
        deleteMessageRef.current.textContent = 'Коментар видалено';
    } catch (error) {
      console.log(error);
      if (deleteMessageRef.current)
        deleteMessageRef.current.textContent = 'Не вдалося видалити коментар';
    } finally {
      setIsDeleting(true);
    }
  };
  return (
    <div className={style.root} key={comment._id}>
      <img
        src={
          comment.user.avatarUrl
            ? `http://localhost:4444${comment.user.avatarUrl}`
            : '/registr_icon.svg'
        }
        alt="аватар користувача"
        className={style.avatar}
      />
      <div className={style.commentBlock}>
        <div className={style.name}>{comment.user.fullName}</div>
        <div className={style.date}>{formatDate(comment.createdAt)}</div>
        <div className={style.commentText}>{comment.text}</div>
      </div>
      <div className={style.commentMessage} ref={deleteMessageRef}></div>
      {userData?._id === comment.user._id && !isDeleting && (
        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={() => deleteComment(comment._id)}
          className={style.commentDelete}
        />
      )}
    </div>
  );
};

export default BlogComment;
