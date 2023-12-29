import React, { useEffect, useState } from 'react';
import style from './Blog.module.scss';
import SkeletonBlog from '../../components/Skeletons/SkeletonBlog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/slices/postSlyce';
import { StatusOfFetch } from '../../store/slices/itemsSlyce';
import Post from '../../components/BlogPost/BlogPost';
import Paginate from '../../components/Paginate/Paginate';
import { fetchAuthMe } from '../../store/slices/authSlyce';
import { AppDispatch, RootState } from '../../store/store';

const Blog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, tags, amount, comments } = useSelector(
    (state: RootState) => state.postsFromBack,
  );

  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const sortParams = ['createdAt', 'viewsCount'];
  const buttonNames = ['Нові', 'Популярні'];
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);
  const limitPosts = 3;
  const limitComments = 3;
  const [activeTag, setActiveTag] = useState<string>('');
  const onPagination = (page: number): void => {
    setCurrentPage(page);
  };

  const getPosts = () => {
    const sortBy = sortParams[activeBtnIndex];
    dispatch(fetchPosts({ currentPage, limitPosts, sortBy, activeTag, limitComments }));
  };

  useEffect(() => {
    getPosts();
    dispatch(fetchAuthMe());
  }, [currentPage, activeBtnIndex, activeTag]);

  useEffect(() => {
    setUniqueTags(tags.filter((value, index, self) => self.indexOf(value) === index));
  }, [tags]);

  return (
    <div className={`${style.root}`}>
      <main>
        <div className={style.tabs}>
          {buttonNames.map((name, i) => (
            <button
              className={activeBtnIndex === i ? `${style.active} button` : 'button'}
              onClick={() => setActiveBtnIndex(i)}
              key={name}>
              {name}
            </button>
          ))}
        </div>
        <div className={style.mainPart}>
          <div className={style.posts}>
            {status === StatusOfFetch.LOADING
              ? [...new Array(3)].map((_, index) => <SkeletonBlog key={index} />)
              : posts.map((post) => (
                  <Post
                    item={post}
                    key={post.title}
                    updatePosts={getPosts}
                    setActiveTag={(postTag: string) => setActiveTag(postTag)}
                  />
                ))}
          </div>
          {status === StatusOfFetch.SUCCESS ? (
            <div className={style.aside}>
              <div className={style.tags}>
                <div className={style.title}>Теги на сторінці:</div>

                {uniqueTags.map((tag) => (
                  <div className={style.tag} key={tag} onClick={() => setActiveTag(tag)}>
                    <span>#</span>
                    {tag}
                  </div>
                ))}
                {activeTag && (
                  <div className={`${style.backToPosts} button`} onClick={() => setActiveTag('')}>
                    Повернутися до всіх статей
                  </div>
                )}
              </div>
              <div className={style.comments}>
                <div className={style.title}>Останні коментарі</div>
                {comments.length > 0 &&
                  comments.map((comment) => (
                    <div className={style.commentBlock} key={comment._id}>
                      <div className={style.commentUser}>
                        <img
                          src={
                            comment.user.avatarUrl
                              ? `http://localhost:4444${comment.user.avatarUrl}`
                              : '/registr_icon.svg'
                          }
                          alt="аватар користувача"
                          className={style.commentAvatar}
                        />
                        <span className={style.commentName}>{comment.user.fullName}</span>
                      </div>
                      <div className={style.commentText}>{comment.text}</div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </main>
      <Paginate
        currentPage={currentPage}
        amount={amount}
        limit={limitPosts}
        onChangePage={(page) => onPagination(page)}
        className={'blog'}
      />
    </div>
  );
};

export default Blog;
