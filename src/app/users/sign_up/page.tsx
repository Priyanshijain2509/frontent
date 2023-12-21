"use client";

import React, { useState } from 'react';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [language, setLanguage] = useState('English');
  const [nickName, setNickName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      language: language,
      nick_name: nickName,
    };

    try {
      const response = await fetch('http://localhost:3000/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json()
      console.log(data)
    //   if (response.ok) {
    //     console.log(response);
    //   } else {
    //     // Handle error response
    //     console.error('Registration failed');
    //   }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h3>Hello from Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label htmlFor='first_name'>First Name</label>
          <br />
          <input
            type='text'
            id='first_name'
            name='first_name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className='field'>
          <label htmlFor='last_name'>Last Name</label>
          <br />
          <input
            type='text'
            id='last_name'
            name='last_name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className='field'>
          <label htmlFor='email'>Email</label>
          <br />
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='field'>
          <label htmlFor='password'>Password</label>
          <br />
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='field'>
          <label htmlFor='password_confirmation'>Confirm Password</label>
          <br />
          <input
            type='password'
            id='password_confirmation'
            name='password_confirmation'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className='field'>
          <label htmlFor='language'>Language</label>
          <br />
          <select
            id='language'
            name='language'
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value='English'>English</option>
            <option value='Hindi'>Hindi</option>
          </select>
        </div>

        <div className='field'>
          <label htmlFor='nick_name'>Nick Name</label>
          <br />
          <input
            type='text'
            id='nick_name'
            name='nick_name'
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>

        <div className='actions'>
          <button type='submit'>Sign up</button>
        </div>
      </form>
    </div>
  );
}
