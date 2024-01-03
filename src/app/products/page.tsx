'use client'

import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function Products() {
  const router = useRouter();

  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const handleLogout = async () => {
    try {
      if (isCurrentUserPresent()) {
        const token = Cookies.get('token');

        console.log(token);
        const response = await fetch('http://localhost:3000/logout', {
          method: 'DELETE',
          headers: {
            'Authorization': token,
          },
        });

        if (response.ok) {
          Cookies.remove('token');
          Cookies.remove('current_user');
          console.log('Logout successful..');
          router.push('/users/sign_in');
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
    <div>
      <div className='logout'>
        <button onClick={handleLogout} className='custom-input'>
          Logout
        </button>
      </div>
      <h2>Product List</h2>
      {Cookies.get('token') ? (
        <h2>{isCurrentUserPresent() ? Cookies.getJSON('current_user').email : ''}</h2>
      ) : (
        <h1>Not Logged In</h1>
      )}
    </div>
  );
}
