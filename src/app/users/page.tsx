'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Users() {
  const router = useRouter();
  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:3000/logout', {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });

      console.log('Logout response:', response);

      if (response.ok) {
        Cookies.remove('token');
        Cookies.remove('current_user');
        console.log('Logout successful.');
        router.push('/users/signIn');
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <main>
      {Cookies.get('auth_token') ? (
        <div>
          <h2>Email: {Cookies.getJSON('current_user').email}</h2>
          <div className='logout'>
            <button onClick={handleLogout} className='custom-input'>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Not Logged In</h1>
        </div>
      )}
    </main>
  );
}
