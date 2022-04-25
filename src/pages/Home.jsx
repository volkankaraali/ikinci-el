import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home'>Home <Link to='register'>register</Link></div>
  );
}

export default Home;