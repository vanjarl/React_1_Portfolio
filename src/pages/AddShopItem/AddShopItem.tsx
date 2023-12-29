// Файл AddPost.js
import React, { useState, useMemo, useCallback, useRef } from 'react';
import styles from './AddShopItem.module.scss'; // Импортируем стили
import { selectIsAuth } from '../../store/slices/authSlyce';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import axios from '../../utils/axios';
import fileDownload from '../../utils/fileDownload';
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import ShopAddPrice from '../../components/ShopAddPrice/ShopAddPrice';
import { RootState } from '../../store/store';

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

export interface PriceList {
  [key: string]: {
    price: number[];
    duration: string[];
  };
}

const AddShopItem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const isAuth = useSelector(selectIsAuth);
  const currentUser = useSelector((state: RootState) => state.auth.data);
  const [text, setText] = useState('');
  const errorDivRef = React.useRef<HTMLDivElement>(null);
  const [priceList, setPriceList] = useState<PriceList>({});
  const selectCategoryRef = useRef<HTMLSelectElement>(null);
  const selectRatingRef = useRef<HTMLSelectElement>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [publishedId, setPublishedId] = useState('');
  const navigate = useNavigate();

  const onChange = useCallback((value: string) => {
    setText(value);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileDownload(e, setImageUrl, errorDivRef);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handlePublish = async () => {
    if (selectCategoryRef.current && selectRatingRef.current && errorDivRef.current) {
      if (!title || !imageUrl || Object.keys(priceList).length === 0 || !text) {
        errorDivRef.current.textContent =
          'Не заповнені всі поля. Перевірте завантаження зображення, введення теми, наявність прайс-листу та опису послуги';
        errorDivRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      } else {
        try {
          const item = {
            title,
            priceList,
            category: selectCategoryRef.current.value,
            rating: selectRatingRef.current.value,
            imageUrl,
            text,
            userId: currentUser?._id,
          };
          const { data } = await axios.post('/items', item);
          if (data) {
            setIsPublished(true);
            setPublishedId(data._id);
          }
        } catch (err: unknown) {
          setImageUrl('');
          errorDivRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
          if (isAxiosError(err)) {
            const axiosError = err as AxiosError<{ message: string }>;
            if (axiosError.response?.data?.message) {
              errorDivRef.current.textContent = axiosError.response.data.message;
            } else {
              console.log(err);
              errorDivRef.current.textContent =
                "Не вдалося з'єднатися з сервером. Спробуйте будь-ласка пізніше";
            }
          }
        }
      }
    }
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/shop" />;
  }

  if (isPublished) {
    return <Navigate to={`/shop/item/${publishedId}`} />;
  }

  return (
    <div className={`${styles.container} container`}>
      <form className={styles.form}>
        <h1 className={styles.title}>Створення нової менторської послуги</h1>
        <div className={styles.errorDiv} ref={errorDivRef}></div>
        <div className={styles.buttonGroup}>
          <label htmlFor="my-file">
            <div className={`${styles.button} ${styles.fileLabel}`}>Загрузити зображення</div>
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
            Тема менторського заняття
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
          <span className={styles.label}>Категорія заняття</span>
          <select name="selectCategory" ref={selectCategoryRef}>
            <option value="1">HTML & CSS</option>
            <option value="2">JavaScript</option>
            <option value="3">React</option>
            <option value="4">Node.js Backend</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.label}>Виберіть рейтинг</span>
          <select name="selectRating" ref={selectRatingRef}>
            {[...Array(10).keys()].map((value) => (
              <option key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>
        </div>

        <ShopAddPrice priceList={priceList} setPriceList={setPriceList} />

        <SimpleMDE options={autofocusNoSpellcheckerOptions} value={text} onChange={onChange} />
        <div className={styles.buttonGroup}>
          <button type="button" onClick={handlePublish} className={styles.button}>
            {'Створити'}
          </button>
          <button type="button" className={styles.button} onClick={() => navigate('/shop')}>
            Відміна
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShopItem;
