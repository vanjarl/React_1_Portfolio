import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="4" y="259" rx="9" ry="9" width="280" height="29" />
    <rect x="131" y="411" rx="23" ry="23" width="153" height="42" />
    <circle cx="136" cy="134" r="112" />
    <rect x="11" y="414" rx="8" ry="8" width="96" height="35" />
    <rect x="13" y="304" rx="21" ry="21" width="258" height="84" />
  </ContentLoader>
);

export default MyLoader;
