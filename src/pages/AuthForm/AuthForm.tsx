import React, { useState, useRef, useEffect } from 'react';
import style from './AuthForm.module.scss'; // Импортируем стили
import { useDispatch, useSelector } from 'react-redux';
import {
  FetchAuthParams,
  FetchedAuthData,
  fetchAuthLogin,
  selectIsAuth,
} from '../../store/slices/authSlyce';
import { Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch } from '../../store/store';

const AuthForm: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const divHelpRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });
  const [passwordVisible, setPasswordVisible] = useState(false); //
  console.log(isValid);
  useEffect(() => {
    //! Проверяем, отмечен ли флажок "Запомнить меня" и предварительно заполняем поле адреса электронной почты, если это так
    const storedEmail = localStorage.getItem('rememberMeEmail');
    if (storedEmail && !watch('email')) {
      setValue('email', storedEmail);
    }
  }, []);

  const onSubmit: SubmitHandler<FetchAuthParams> = async (values) => {
    // !Зберігаємо адресу електронної пошти та стан "Запам'ятати мене" в localStorage, якщо прапорець "Запам'ятати мене" позначений
    if (values.rememberMe) {
      localStorage.setItem('rememberMeEmail', values.email);
    } else {
      localStorage.removeItem('rememberMeEmail');
    }

    const data = await dispatch(fetchAuthLogin(values));

    if (!data.payload) {
      if (divHelpRef.current) divHelpRef.current.textContent = 'Невірний логін або пароль';
    } else {
      const fetchedAuthData = data.payload as FetchedAuthData;
      const token = fetchedAuthData.token;
      window.localStorage.setItem('token', token);
    }
  };

  if (isAuth) {
    return <Navigate to="/blog" />;
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <h1 className={style.title}>Вхід в аккаунт</h1>

        <div className={style.helperText} ref={divHelpRef}></div>

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
            {...register('password', { required: 'Вкажіть пароль' })}
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
          <div className={style.checkboxGroup}>
            <input
              type="checkbox"
              id="rememberMe"
              className={style.checkbox}
              {...register('rememberMe')}
            />
            <label htmlFor="rememberMe" className={style.checkboxLabel}>
              Запам'ятати мене
            </label>
          </div>
        </div>
        <button type="submit" disabled={!isValid} className={style.button}>
          Увійти
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
