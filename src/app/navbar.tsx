'use client'

import Link from 'next/link';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const handleLogout = async () => {
    try {
      if (isCurrentUserPresent()) {
        const token = Cookies.get('auth_token');

        console.log(token);
        const response = await fetch('http://localhost:3000/logout', {
          method: 'DELETE',
          headers: {
            'Authorization': token,
          },
        });

        if (response.ok) {
          Cookies.remove('auth_token');
          Cookies.remove('current_user');
          console.log('Logout successful..');
          router.push('/users/signIn');
        } else {
          const errorData = await response.json();
          console.error('Logout failed:', errorData);
        }
      } else {
        console.log('Current user is not present in cookies.');
        router.push('/products');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between w-full md:flex md:w-auto md:order-1 navbar" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-green-600 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
            <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
              Home
            </Link>
            <Link href="/help" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Help
            </Link>
          </ul>
          <div className="flex items-center" style={{ paddingRight: '1rem' }}>
            {isCurrentUserPresent() ? (
              <>
                <p className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ele-navbar'>
                  Logged in as {Cookies.getJSON('current_user').nick_name}
                </p>
                <Link href='/users/myAccount' className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ele-navbar'>
                  My Account
                </Link>
                <div className='logout'>
                  <button onClick={handleLogout} className='md:dark:hover:text-blue-500 ele-navbar'>
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link href='/users/signIn' className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ele-navbar'>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="second-navbar p-5" style={{ marginTop: '1.5rem' }}>
        <div className="container mx-auto flex items-center justify-between">
          <h3>Projects</h3>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="ml-1 bg-blue-500 text-white px-3 py-1 rounded-md">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
