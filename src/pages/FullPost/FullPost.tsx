import React, { useEffect, useState, useRef } from 'react';
import style from './FullPost.module.scss';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import formatDate from '../../utils/formatDate';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import Markdown from 'https://esm.sh/react-markdown@9';
import Markdown from 'react-markdown';
import { useSelector } from 'react-redux';
import BlogComment from '../../components/BlogComment/BlogComment';
import { RootState } from '../../store/store';
import { PostItem } from '../../store/slices/postSlyce';

const FullPost: React.FC = () => {
  const currentUserData = useSelector((state: RootState) => state.auth.data);
  const [post, setPost] = useState<PostItem>();
  const { id } = useParams();
  const [textareaValue, setTextareaValue] = useState('');
  const addCommentRef = useRef<HTMLDivElement>(null);
  const commentAdded = useRef(false);

  const fetchData = async () => {
    try {
      if (id) {
        const { data } = await axios.get<PostItem>(`/posts/${id.slice(1)}`);
        setPost(data);
      }
      if (commentAdded.current && addCommentRef.current) {
        addCommentRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        commentAdded.current = false;
      } else {
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Не вдалося отримати статтю');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addComment = async () => {
    if (textareaValue.trim() && post) {
      try {
        const { data } = await axios.post<Comment>(`/posts/${post._id}/comment`, {
          text: textareaValue.trim(),
        });
        if (data) {
          commentAdded.current = true;
          setTextareaValue('');
          fetchData();
        }
      } catch (error) {
        console.log(error);
        alert('Не вдалося додати коментар');
      }
    }
  };

  return (
    <div className={style.root}>
      <div className={style.post}>
        <div className={style.top}>
          <div className={style.image}>
            <img
              src={post?.imageUrl ? `http://localhost:4444${post.imageUrl}` : '/blog-noImage.jpg'}
              alt="post theme"
            />
          </div>
          <div className={style.data}>
            <div className={style.author}>
              <img
                src={
                  post?.user?.avatarUrl
                    ? `http://localhost:4444${post.user.avatarUrl}`
                    : '/registr_icon.svg'
                }
                alt="аватар користувача"
                className={style.avatar}
              />

              <div className={style.authorData}>
                <div className={style.name}>{post?.user?.fullName || <Skeleton />}</div>
                <div className={style.date}>{post ? formatDate(post.createdAt) : <Skeleton />}</div>
              </div>
            </div>
            <div className={style.title}>{post?.title || <Skeleton />}</div>
            <div className={style.tags}>
              {!post ? (
                <Skeleton count={3} />
              ) : (
                post.tags.map((tag) => (
                  <span key={tag} className={style.tag}>
                    #{tag}
                  </span>
                ))
              )}
            </div>
            <div className={style.info}>
              <div className={style.sumOfComments}>
                <img src="/blog-eye.svg" alt="коментар" />
                <span>&nbsp;{post?.viewsCount || 0}</span>
              </div>
              <div className={style.views}>
                <img src="/blog-message.svg" alt="перегляди" />
                <span>&nbsp;{post?.comments?.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.text}>
          {<Markdown>{post?.text}</Markdown> || <Skeleton height="100px" width="95%" />}
        </div>
      </div>
      <div className={style.comments}>
        <div className={style.title}>Коментарі</div>
        {currentUserData && (
          <div className={style.addComment} ref={addCommentRef}>
            <div className={style.commentZone}>
              <img
                src={
                  currentUserData.avatarUrl
                    ? `http://localhost:4444${currentUserData.avatarUrl}`
                    : '/registr_icon.svg'
                }
                alt="аватар користувача"
                className={style.avatar}
              />
              <textarea
                name="addComment"
                id=""
                cols={30}
                rows={5}
                placeholder="Написати коментар"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </div>
            <button onClick={addComment}>Додати коментар</button>
          </div>
        )}
        {post?.comments?.map((comment) => (
          <BlogComment key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </div>
  );
};

export default FullPost;
