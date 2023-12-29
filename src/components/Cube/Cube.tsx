import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCss3Alt,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faNode,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
import style from './Cube.module.scss';

const Cube: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.cubeSpinner}>
        <div className={style.face1}>
          <FontAwesomeIcon icon={faNode} color="#8CC84B" />
        </div>
        <div className={style.face2}>
          <FontAwesomeIcon icon={faCss3Alt} color="#28A4D9" />
        </div>
        <div className={style.face3}>
          <FontAwesomeIcon icon={faHtml5} color="#F06529" />
        </div>
        <div className={style.face4}>
          <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
        </div>
        <div className={style.face5}>
          <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
        </div>
        <div className={style.face6}>
          <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
        </div>
      </div>
    </div>
  );
};

export default Cube;
