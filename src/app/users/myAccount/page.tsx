'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  language: string;
  nickName: string;
}

export default function MyAccount() {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    language: 'English',
    nickName: '',
  });

  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const router = useRouter();

  useEffect(() => {
    const currentUser = Cookies.getJSON('current_user');
    if (currentUser) {
      setUserData({
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        email: currentUser.email,
        password: '',
        passwordConfirmation: '',
        language: currentUser.language || 'English',
        nickName: currentUser.nick_name ,
      });
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Cookies.getJSON('current_user').id;
    const formData = {
      user_id: id,
      ...userData,
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('auth_token')
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User data updated successfully');
        router.push('/home');
      } else {
        console.error('User data update failed');
      }
    } catch (error) {
      console.error('Error during user data update:', error);
    }
  };

  return (
    <>
      { isCurrentUserPresent() ? (
        <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">My Account</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">First Name:</span>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="form-input border border-gray-300 rounded-md mt-1 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Last Name:</span>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="form-input border border-gray-300 rounded-md mt-1 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="form-input border border-gray-300 rounded-md mt-1 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Password:</span>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="form-input border border-gray-300 rounded-md mt-1 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Confirm Password:</span>
            <input
              type="password"
              name="passwordConfirmation"
              value={userData.passwordConfirmation}
              onChange={handleChange}
              className="form-input border border-gray-300 rounded-md mt-1 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Language:</span>
            <select
              name="language"
              value={userData.language}
              onChange={handleChange}
              className="form-select mt-1 block w-full"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Nick Name:</span>
            <input
              type="text"
              name="nickName"
              value={userData.nickName}
              onChange={handleChange}
              className="form-input border border-gray-300 rounded-md mt-1 block w-full"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Update My Account
          </button>
        </form>
      </div>

        ) : (
        <div>
          <h1>not logged in!</h1>
        </div>
        )
      }
    </>
  );
}
