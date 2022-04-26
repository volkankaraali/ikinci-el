import React, { Route, Routes } from 'react-router-dom';

import './scss/index.scss';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='detail/:id' element={<ProductDetail/>}/>

        <Route element={<RequireAuth/>}>
          <Route path='profile/:username' element={<UserProfile/>}/>
        </Route>
        
      </Route>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
    </Routes>
  );
}

export default App;
