import axios from './axios';
import { ChangeEvent } from 'react';

export default async function fileDownload(
  e: ChangeEvent<HTMLInputElement>,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  errorContainerRef: React.RefObject<any>,
) {
  try {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);

      if (data.url) {
        setImageUrl(data.url);
        e.target.value = '';
				errorContainerRef.current.textContent ='';
        
      }
    } else {
      console.error('Помилка: Файл не выбран');
    }
  } catch (err) {
    console.error('Помилка', err);
    errorContainerRef.current.textContent = 'Помилка при спробі завантаження файлу';
		e.target.value = '';

  }
}
