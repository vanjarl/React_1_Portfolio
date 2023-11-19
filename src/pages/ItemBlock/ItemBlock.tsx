import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemBlock: React.FC = () => {
  const { id } = useParams();
  const [item, setItem] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get('https://6453758ee9ac46cedf25d56d.mockapi.io/items/' + id);
        setItem(data);
      } catch {
        alert('Не удалось получить данные о товаре');
      }
    }
    fetchItem();
  }, []);

  if (!item) return <h1>...Идет загрузка</h1>;

  return (
    <div className={`container`}>
      <img src={item.imageUrl} alt="item" />
      <h1>{item.title}</h1>
      <p>{item.price}</p>
    </div>
  );
};

export default ItemBlock;
