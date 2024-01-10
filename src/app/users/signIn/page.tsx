'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';
import Cookies from 'js-cookie';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const newToken = responseData.token;
        const current_user = responseData.user;
        Cookies.set('token', newToken);
        Cookies.set('current_user', current_user);
        const user_id = Cookies.getJSON('current_user').id;
        router.push(`/users/${user_id}/projects`);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='h-full flex items-center justify-center bg-gray-50 overflow-hidden py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 overflow-hidden'>
        <div>
          <h2 className='text-center text-3xl font-extrabold text-gray-900'>Log In</h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <input type='hidden' name='remember' value='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='rememberMe'
                name='rememberMe'
                type='checkbox'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label htmlFor='rememberMe' className='ml-2 block text-sm text-gray-900'>
                Remember me
              </label>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4
              border border-transparent text-sm font-medium rounded-md text-white
              bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-green-600'
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
