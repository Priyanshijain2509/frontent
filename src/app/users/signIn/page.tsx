"use client";

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
  const { user, setUser } = useContext(UserContext);

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
        Cookies.set('auth_token', newToken);
        Cookies.set('current_user', current_user );

        // setUser(responseData.user);
        // setToken(newToken);

        router.push('/products');

      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='login'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label htmlFor='email'>Email</label><br />
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            autoComplete='email'
            className='custom-input'
          />
        </div>

        <div className='field'>
          <label htmlFor='password'>Password</label><br />
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
            className='custom-input'
          />
        </div>

        { /* Optional: Lost password link */ }
        {/* <div className='field'>
          <a href='/forgot-password' className='lost-password'>Lost password</a><br />
        </div> */}

        { /* Optional: Remember me checkbox */ }
        {/* <div className='field'>
          <input
            type='checkbox'
            id='rememberMe'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor='rememberMe'>Stay logged in</label>
        </div> */}

        <div className='actions'>
          <button type='submit' className='custom-input'>Login</button>
        </div>
      </form>

    </div>
  );
}
