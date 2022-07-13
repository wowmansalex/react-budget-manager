import React from 'react';
import Spinner from '../components/Spinner';
import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container m-w-full mx-auto my-16 flex flex-col items-center'>
      <h1 className='text-center text-xl font-bold my-2'>Login</h1>
      <p className='text-center text-m my-2'>Sign in your account</p>
      <form className='content-center' onSubmit={onSubmit}>
        <div className='mt-4 rounded-md'>
          <input
            className='rounded-md'
            type='email'
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>
        <div className='mt-4 '>
          <input
            className='rounded-md'
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
        </div>
        <div className='mt-4 flex flex-col items-center'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
