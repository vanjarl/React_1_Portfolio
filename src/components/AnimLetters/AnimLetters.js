import React from 'react';

const AnimLetters = (props) => {
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
