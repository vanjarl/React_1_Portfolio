import { useEffect, useState } from 'react';
import style from './Home.module.scss';
import { Link } from 'react-router-dom';
import AnimLetters from '../../components/AnimLetters/AnimLetters';
import Cube from '../../components/Cube/Cube';

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 4000);
  }, []);
  const [letterClass, setLetterClass] = useState('text-animate');
  const hiArray = ['р', 'и', 'в', 'і', 'т', '!'];
  const nameArray = ['в', 'а', 'н'];
  const jobArray = ['в', 'е', 'б', '-', 'р', 'о', 'з', 'р', 'о', 'б', 'н', 'и', 'к'];
  return (
    <div className={style.root}>
      <div className={`${style.textZone} fade-in-image`}>
        <span className={`${style.tags} ${style.topTags}`}>&lt;body&gt;</span>
        <h1>
          <span className={letterClass}>П</span>
          <AnimLetters className={letterClass} strArray={hiArray} idx={12} />
          <span>&nbsp;</span>
          <span className={`${letterClass} _18`}>Я</span>
          <span className={`${letterClass} _19`}>,</span>
          <span>&nbsp;</span>
          <img src="/logo2.png" alt="" />
          <AnimLetters className={letterClass} strArray={nameArray} idx={20} />
          <br />
          <AnimLetters className={letterClass} strArray={jobArray} idx={23} />
          {/* <br /> */}
        </h1>
        <span className={style.about}>
          Я палко відданий світу програмування. Кожен день я прокидаюся з думкою про нові проекти,
          цікаві технології та можливості, які вони надають.{' '}
        </span>
        <span className={style.about}>
          Також мене надзвичайно надихає сам процес навчання. Я відчуваю велике задоволення від
          знайомства з новими концепціями, вирішення складних завдань та постійного особистісного
          зростання.
        </span>
        <Link to="/contact" className={style.contactLink}>
          Зв'язатися зі мною
        </Link>
        <span className={`${style.tags} ${style.bottomTags}`}>&lt;/body&gt;</span>
        <span className={`${style.tags} ${style.bottomTags}`}>&lt;/html&gt;</span>
      </div>

      <Cube />
    </div>
  );
};

export default Home;
