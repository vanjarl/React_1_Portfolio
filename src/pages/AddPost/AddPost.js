// Файл AddPost.js
import React, { useState } from 'react';
import styles from './AddPost.module.scss'; // Импортируем стили
import LoginHeader from '../../components/LoginHeader/LoginHeader';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePreviewUpload = (e) => {
    // Обработка загрузки превью статьи
  };

  const handlePublish = () => {
    // Логика для публикации статьи
  };

  return (
    <>
      <div className={`${styles.container} container`}>
        <form className={styles.form}>
          <h1 className={styles.title}>Створення нової статті</h1>
          <div className={styles.inputGroup}>
            <label htmlFor="title" className={styles.label}>
              Заголовок:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="tags" className={styles.label}>
              Теги:
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={handleTagsChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="content" className={styles.label}>
              Текст статьи:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              className={styles.textarea}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={handlePublish} className={styles.button}>
              Опублікувати
            </button>
            <button type="button" className={styles.button}>
              Відміна
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPost;
