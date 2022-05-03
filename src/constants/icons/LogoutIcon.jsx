import React from 'react';
const LogoutIcon = props => (
  <svg width={props.size || 25} height={props.size || 25} viewBox="0 0 25 28" fill={props.color || 'black'} xmlns="http://www.w3.org/2000/svg">
    <path d="M10.92 14H23.92" stroke={props.color || 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.9301 23V26H2.93005V2H18.9301V5H20.9301V1C20.9301 0.734784 20.8247 0.48043 20.6372 0.292893C20.4496 0.105357 20.1953 0 19.9301 0H1.93005C1.66484 0 1.41048 0.105357 1.22295 0.292893C1.03541 0.48043 0.930054 0.734784 0.930054 1V27C0.930054 27.2652 1.03541 27.5196 1.22295 27.7071C1.41048 27.8946 1.66484 28 1.93005 28H19.9301C20.1953 28 20.4496 27.8946 20.6372 27.7071C20.8247 27.5196 20.9301 27.2652 20.9301 27V23H18.9301Z" fill={props.color || 'black'} />
    <path d="M23.92 14L19.92 18" stroke={props.color || 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23.92 14L19.92 10" stroke={props.color || 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.92 6.09003V4.09003" stroke={props.color || 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.92 24V22" stroke={props.color || 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

export default LogoutIcon;