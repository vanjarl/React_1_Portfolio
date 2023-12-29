import React from 'react';

type AnimLettersProps = {
  strArray: string[];
  idx: number;
  className: string;
};

const AnimLetters: React.FC<AnimLettersProps> = (props) => {
  return (
    <span>
      {props.strArray.map((char, i) => {
        return (
          <span key={char + i} className={`${props.className} _${i + props.idx}`}>
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default AnimLetters;
