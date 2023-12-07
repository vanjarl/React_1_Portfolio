import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={540}
    height={350}
    viewBox="0 0 540 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="8" y="27" rx="9" ry="9" width="222" height="220" />
    <rect x="131" y="411" rx="23" ry="23" width="153" height="42" />
    <rect x="11" y="414" rx="8" ry="8" width="96" height="35" />
    <rect x="240" y="29" rx="62" ry="62" width="60" height="59" />
    <rect x="311" y="38" rx="7" ry="7" width="97" height="40" />
    <rect x="244" y="100" rx="7" ry="7" width="282" height="84" />
    <rect x="243" y="195" rx="7" ry="7" width="48" height="22" />
    <rect x="254" y="230" rx="7" ry="7" width="57" height="20" />
    <rect x="308" y="195" rx="7" ry="7" width="48" height="22" />
    <rect x="368" y="195" rx="7" ry="7" width="48" height="22" />
    <rect x="319" y="230" rx="7" ry="7" width="57" height="20" />
  </ContentLoader>
);

export default MyLoader;
