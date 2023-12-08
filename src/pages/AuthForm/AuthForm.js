// Файл AuthForm.js
import React, { useState } from 'react';
import style from './AuthForm.module.scss'; // Импортируем стили
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthLogin, selectIsAuth } from '../../store/slices/authSlyce';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AuthForm = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'vanjarl04111626@gmail.com',
      password: '26101989IVAN@',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuthLogin(values));
    if (!data.payload) {
      // TODO: сделать сообщение о неверно введеном логине или пароле правильно а не через алерт
      alert('Не вдалося авторизуватися. Можливо не вірно введено логін або пароль');
    } else {
      const token = data.payload.token;
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
        <div className={style.inputGroup}>
          <label htmlFor="email" className={style.label}>
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            className={`${style.input} ${errors.email ? style.red : ''}`}
            {...register('email', { required: 'Укажите почту' })}
          />
          <div className={style.helperText}>{errors.email?.message}</div>
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="password" className={style.label}>
            Пароль:
          </label>
          <input
            type="password"
            id="password"
            className={`${style.input} ${errors.email ? style.red : ''}`}
            {...register('password', { required: 'Укажите пароль' })}
          />
          <div className={style.helperText}>{errors.password?.message}</div>
        </div>
        <button type="submit" className={style.button}>
          Увійти
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
