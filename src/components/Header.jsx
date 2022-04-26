import React from 'react';
import { Link } from 'react-router-dom';
import HumanIcon from '../constant/icons/HumanIcon';
import Logo from '../constant/icons/Logo';
import PlusIcon from '../constant/icons/PlusIcon';
import { useAuth } from '../context/AuthProviderContext';

function Header() {
  const { auth } = useAuth();
  return (
    <header>
      <div className="container">
        <Logo />
        <div className='menu'>
          {
            auth?.authToken ?
              <>
                <Link to=''><PlusIcon /> Ürün Ekle</Link>
                <Link to=''><HumanIcon /> Hesabım</Link>

              </>
              : <Link to='login'><HumanIcon /> Giriş Yap</Link>
          }

        </div>
      </div>

    </header>
  );
}

export default Header;