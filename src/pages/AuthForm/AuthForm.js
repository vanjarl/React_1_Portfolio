// Файл AuthForm.js
import React, { useState } from 'react';
import styles from './AuthForm.module.scss'; // Импортируем стили

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете добавить логику для отправки данных на сервер (например, через API запрос)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles.container}>
      {' '}
      {/* Применяем стили */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Вхід в аккаунт</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Пароль:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Увійти
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
