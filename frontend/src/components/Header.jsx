import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className='flex flex-row justify-between mt-4'>
      <div className=''>
        <Link to='/'>Budget Manager</Link>
      </div>
      <ul>
        {user ? (
          <li className='flex flew-row'>
            <button className='' onClick={onLogout}>
              Logout
            </button>
          </li>
        ) : (
          <div className='flex flew-row justify-evenly'>
            <li className='mx-4'>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </div>
        )}
      </ul>
    </header>
  );
}

export default Header;
