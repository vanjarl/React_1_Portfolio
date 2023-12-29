// Файл AddPost.js
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../store/slices/authSlyce';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import axios from '../../utils/axios';
import fileDownload from '../../utils/fileDownload';
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

const AddPost: React.FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const [value, setValue] = useState('');
  const [publishedPostId, setPublishedPostId] = useState(null);
  const errorDivRef = React.useRef<HTMLDivElement>(null);
  const inputTagRef = React.useRef<HTMLInputElement>(null);
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          setValue(res.data.text);
          setImageUrl(res.data.imageUrl);
          setTags(res.data.tags);
          setTitle(res.data.title);
        })
        .catch((err) => {
          console.log(err);
          alert('Не вдалося отримати статтю');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileDownload(e, setImageUrl, errorDivRef);
  };

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      placeholder: 'Введіть текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'someUniqueId',
      },
    };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = () => {
    if (inputTagRef.current) {
      setTags([...tags, inputTagRef.current.value.trim().toLowerCase()]);
      inputTagRef.current.value = '';
    }
  };

  const handlePublish = async () => {
    if (title && value && tags.length > 0 && imageUrl) {
      try {
        const post = {
          title,
          text: value,
          tags,
          imageUrl,
        };
        const { data } = isEditing
          ? await axios.patch(`/posts/${id}`, post)
          : await axios.post('/posts', post);
        const _id = isEditing ? id : data._id;
        setPublishedPostId(_id);
        setIsPublished(true);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message: string }>;
          if (axiosError.response?.data?.message) {
            if (errorDivRef.current)
              errorDivRef.current.textContent = axiosError.response.data.message;
          }
        } else {
          if (errorDivRef.current)
            errorDivRef.current.textContent =
              'Сталася помилка при завантаженні статті. Спробуйте будь-ласка пізніше';
        }
      }
    } else {
      if (errorDivRef.current) {
        errorDivRef.current.textContent =
          'Не заповнені всі поля. Перевірте завантаження зображення, введення заголовку, додавання тегів та тексту посту';
        errorDivRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/blog" />;
  }

  if (isPublished) {
    return <Navigate to={`/blog/:${publishedPostId}`} />;
  }

  return (
    <div className={`${styles.container} container`}>
      <form className={styles.form}>
        <h1 className={styles.title}>Створення нової статті</h1>
        <div className={styles.errorDiv} ref={errorDivRef}></div>

        <div className={styles.buttonGroup}>
          <label htmlFor="my-file">
            <div className={`${styles.button} ${styles.fileLabel}`}>Завантажити зображення</div>
          </label>
          {imageUrl && (
            <>
              <button
                onClick={() => setImageUrl('')}
                className={`${styles.button} ${styles.fileDelete}`}>
                Видалити зображення
              </button>
              <img src={`http://localhost:4444${imageUrl}`} alt="preview" />
            </>
          )}

          <input
            type="file"
            id="my-file"
            className={styles.input}
            onChange={handleFileChange}
            hidden
          />
        </div>
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
          <input type="text" id="tags" className={styles.input} ref={inputTagRef} />
          <div className={`${styles.button} ${styles.tagButton}`} onClick={handleTagsChange}>
            Додати тег
          </div>
          {tags.length > 0 && (
            <div className={styles.addedTagsGroup}>
              Додані теги:
              <div className={styles.addedTags}>
                {tags.map((tag, i) => (
                  <span key={tag + i}>#{tag}&nbsp;</span>
                ))}
              </div>
              <div className={`${styles.deleteTags} ${styles.button}`} onClick={() => setTags([])}>
                Очистити теги
              </div>
            </div>
          )}
        </div>
        <SimpleMDE options={autofocusNoSpellcheckerOptions} value={value} onChange={onChange} />
        <div className={styles.buttonGroup}>
          <button type="button" onClick={handlePublish} className={styles.button}>
            {isEditing ? 'Зберегти' : 'Опублікувати'}
          </button>
          <button type="button" className={styles.button} onClick={() => navigate('/blog')}>
            Відміна
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
