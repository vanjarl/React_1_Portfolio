import React, { useEffect, useState } from 'react';
import style from './FullPost.module.scss';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import formatDate from '../../utils/formatDate';

const FullPost = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/${id.slice(1)}`);
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Не вдалося отримати статтю');
      }
    };
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className={style.root}>
        <h1>...Загружаємо статю</h1>
      </div>
    );
  return (
    <div className={style.root}>
      <div className={style.post}>
        <div className={style.top}>
          <div className={style.image}>
            <img src="/morning.jpg" alt="" />
          </div>
          <div className={style.data}>
            <div className={style.author}>
              <img src="/logo.png" alt="аватар користувача" className={style.avatar} />

              <div className={style.authorData}>
                <div className={style.name}>{post.user.fullName}</div>
                <div className={style.date}>{formatDate(post.createdAt)}</div>
              </div>
            </div>
            <div className={style.title}>{post.title}</div>
            <div className={style.tags}>
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <div className={style.info}>
              <div className={style.sumOfComments}>
                <img src="/blog-eye.svg" alt="" />
                <span>&nbsp;200</span>
              </div>
              <div className={style.views}>
                <img src="/blog-message.svg" alt="" />
                <span>&nbsp;{post.viewsCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.text}>{post.text}</div>
      </div>
      <div className={style.comments}>
        <div className={style.title}>Коментарі</div>
        <div className={style.comment}>
          <img src="/logo.png" alt="аватар користувача" className={style.avatar} />
          <div className={style.textPart}>
            <div className={style.name}>Ivan</div>
            <div className={style.name}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero provident ducimus eos
              a vero sint suscipit, magni, unde itaque magnam eaque asperiores tenetur nobis ullam!
            </div>
          </div>
        </div>
        <div className={style.add}>
          <img src="/logo.png" alt="аватар користувача" className={style.avatar} />

          <textarea
            name="addComment"
            id=""
            cols="30"
            rows="5"
            placeholder="Написати коментар"></textarea>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
