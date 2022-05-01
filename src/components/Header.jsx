import React from 'react';
import { Link } from 'react-router-dom';
import HumanIcon from '../constants/icons/HumanIcon';
import Logo from '../constants/icons/Logo';
import PlusIcon from '../constants/icons/PlusIcon';
import { useAuth } from '../context/AuthProviderContext';

function Header() {
  const { auth } = useAuth();
  const urlParam = auth?.email?.split('@')[0];
  return (
    <header>
      <div className="container">

        <Link to='/'><Logo /></Link>
        <div className='menu'>
          {
            auth?.id ?
              <>
                <Link to='add' className='addProduct'><PlusIcon /> <span className='addProductText' > Ürün Ekle</span> </Link>
                <Link to={`profile/${urlParam}`} className='myProfile' ><HumanIcon /> Hesabım</Link>

              </>
              : <Link to='login'><HumanIcon /> Giriş Yap</Link>
          }

        </div>
      </div>

    </header>
  );
}

export default Header;