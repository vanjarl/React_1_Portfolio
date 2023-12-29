// Файл RegisterForm.js
import React, { useState, useRef } from 'react';
import style from './RegisterForm.module.scss'; // Импортируем стили
import { useDispatch, useSelector } from 'react-redux';
import {
  FetchRegisterParams,
  FetchedAuthData,
  fetchRegister,
  selectIsAuth,
} from '../../store/slices/authSlyce';
import { Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import fileDownload from '../../utils/fileDownload';
import { AppDispatch, RootState } from '../../store/store';
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

const RegisterForm = () => {
  const isAuth = useSelector(selectIsAuth);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch<AppDispatch>();
  const divHelpRef = useRef<HTMLDivElement>(null);
  const divAvatarErrRef = useRef();
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    criteriaMode: 'all',
    mode: 'onChange',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileDownload(e, setAvatarUrl, divAvatarErrRef);
  };

  const onSubmit: SubmitHandler<FetchRegisterParams> = async (values) => {
    const data = await dispatch(fetchRegister({ ...values, avatarUrl }));
    if (data.payload) {
      const fetchedAuthData = data.payload as FetchedAuthData;
      const token = fetchedAuthData.token;
      window.localStorage.setItem('token', token);
    } else {
      if (error === 'Request failed with status code 400' && divHelpRef.current) {
        divHelpRef.current.textContent = 'Користувач з таким email вже зареєстрований';
      } else if (divHelpRef.current) {
        divHelpRef.current.textContent = 'Нажаль сталася помилка. Спробуйте будь-ласка пізніше';
      }
    }
  };

  if (isAuth) {
    return <Navigate to="/blog" />;
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <h1 className={style.title}>Створити аккаунт</h1>
        <label htmlFor="avatar" className={style.addAvatar}>
          <div>
            Натисніть для додавання аватару
            <br />
            &#40;не обов'язково&#41;
          </div>
          <img
            src={avatarUrl ? `http://localhost:4444${avatarUrl}` : '/registr_icon.svg'}
            alt="поле для додавання аватару"
          />
        </label>
        {/* <div ref={divAvatarErrRef} className={style.helperText}></div> */}
        <input type="file" id="avatar" onChange={handleFileChange} hidden />

        <div className={style.helperText} ref={divHelpRef}></div>
        <div className={style.inputGroup}>
          <label htmlFor="name" className={style.label}>
            Ім'я
          </label>
          <input
            type="text"
            id="name"
            className={`${style.input} ${errors.fullName ? style.red : ''}`}
            {...register('fullName', {
              required: "Вкажіть ім'я",
              minLength: {
                value: 3,
                message: 'Довжина імені повинна бути не менше 3 символів',
              },
            })}
          />
          <div className={style.helperText}>{errors.fullName?.message}</div>
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="email" className={style.label}>
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            className={`${style.input} ${errors.email ? style.red : ''}`}
            {...register('email', { required: 'Вкажіть почту' })}
          />
          <div className={style.helperText}>{errors.email?.message}</div>
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="password" className={style.label}>
            Пароль:
          </label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            className={`${style.input} ${errors.password ? style.red : ''}`}
            {...register('password', {
              required: 'Введіть пароль',
              minLength: {
                value: 8,
                message: 'Довжина пароля повинна бути не менше 8 символів',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
                message:
                  'Пароль повинен містити хоча б одну строчну і одну загальну латинські літери, одну цифру і один із спеціальних символів',
              },
            })}
          />
          <button
            type="button"
            className={style.passwordToggle}
            onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
          <div className={style.helperText}>{errors.password?.message}</div>
        </div>
        <button type="submit" disabled={!isValid} className={style.button}>
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
