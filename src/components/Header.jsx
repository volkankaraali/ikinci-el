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

        <Link to='/'><Logo /></Link>
        <div className='menu'>
          {
            auth?.authToken ?
              <>
                <Link to='' className='addProduct'><PlusIcon /> <span className='addProductText' > Ürün Ekle</span> </Link>
                <Link to='' className='myProfile' ><HumanIcon /> Hesabım</Link>

              </>
              : <Link to='login'><HumanIcon /> Giriş Yap</Link>
          }

        </div>
      </div>

    </header>
  );
}

export default Header;