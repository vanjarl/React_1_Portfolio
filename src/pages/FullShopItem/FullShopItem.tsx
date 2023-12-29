import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import Markdown from 'react-markdown';
import style from './FullShopItem.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ItemBlock: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.data);
  const { id } = useParams();
  const [item, setItem] = useState<{
    imageUrl: string;
    title: string;
    text: string;
    userId: string;
  }>();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get('items/' + id);
        setItem(data);
      } catch {
        alert('Не вдалося отримати дані ');
      }
    }
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDelete = async () => {
    try {
      const { data } = await axios.delete('items/' + id);
      if (data) setIsDeleted(true);
    } catch {
      alert('Не вдалося видалити послугу. Спробуйте пізніше');
    }
  };

  if (!item)
    return (
      <div className={`container ${style.root}`}>
        <h1>...Триває завантаження</h1>
      </div>
    );
  if (isDeleted) {
    return (
      <div className={`container ${style.root}`}>
        <h1>Послугу видалено</h1>
        <Link to={'/shop'}>
          <button id="loginButton" className="button">
            Повернутися до замовлень
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`container ${style.root}`}>
      <img src={`http://localhost:4444${item.imageUrl}`} alt="item" />
      <h1>{item.title}</h1>
      <Markdown className={style.description}>{item.text}</Markdown>
      <div className={style.buttons}>
        <Link to={'/shop'}>
          <button id="loginButton" className="button">
            Повернутися до замовлень
          </button>
        </Link>
        {currentUser?._id === item.userId ? (
          <button className={`${style.redButton} button`} onClick={onClickDelete}>
            Видалити послугу
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ItemBlock;
