import React, { useEffect, useState } from 'react';
import style from './Blog.module.scss';
import SkeletonBlog from '../../components/Skeletons/SkeletonBlog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/slices/postSlyce';
import { StatusOfPostFetch } from '../../store/slices/postSlyce';
import Post from '../../components/BlogPost/BlogPost';
import Paginate from '../../components/Paginate/Paginate';

const Blog = () => {
  const dispatch = useDispatch();
  const { posts, status, tags } = useSelector((state) => state.postsFromBack);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  useEffect(() => {
    // TODO: сделать пагинацию
    console.log(currentPage, limit);
    dispatch(fetchPosts(currentPage, limit));
  }, []);
  const onPagination = (page) => {
    setCurrentPage(page);
    dispatch(fetchPosts(currentPage, limit));
  };

  useEffect(() => {
    setUniqueTags(tags.filter((value, index, self) => self.indexOf(value) === index));
    console.log(uniqueTags);
  }, [tags]);

  return (
    <div className={`${style.root}`}>
      <main>
        <div className={style.tabs}>
          <button className={`active button`}>Новые</button>
          <button className={`button`}>Популярные</button>
        </div>
        <div className={style.mainPart}>
          <div className={style.posts}>
            {status === StatusOfPostFetch.LOADING
              ? [...new Array(3)].map((_, index) => <SkeletonBlog key={index} />)
              : posts.map((post) => <Post item={post} key={post.title} />)}
          </div>
          {status === StatusOfPostFetch.SUCCESS ? (
            <div className={style.aside}>
              <div className={style.tags}>
                <div className={style.title}>Теги</div>

                {uniqueTags.slice(0, 10).map((tag) => (
                  <div className={style.tag}>
                    <span>#</span>
                    {tag}
                  </div>
                ))}
              </div>
              <div className={style.comments}>
                <div className={style.title}>Коментарі</div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </main>
      <Paginate
        currentPage={1}
        amount={10}
        limit={limit}
        onChangePage={(page) => onPagination(page)}
      />
    </div>
  );
};

export default Blog;
