'use client'

import Link from 'next/link';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import UserContext from '@/context/UserContext';

export default function Navbar() {
  const router = useRouter();
  const [projectDetails, setProjectDetails] = useState(null);

  // Cookie
  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const currentUser = Cookies.getJSON('current_user');
  const user_id = currentUser ? currentUser.id : null;

  // context api to fetch project id
  const {projectInfo} = useContext(UserContext);

  useEffect(() => {
    if (projectInfo && projectInfo.projectId) {
      const fetchProjectDetails = async () => {
        try {
          const token = Cookies.get('token');
          if (token) {
            const response = await fetch(
              `http://localhost:3000/users/${projectInfo.userId}/projects/${projectInfo.projectId}/info`,
              {
                method: 'GET',
                headers: {
                  'Authorization': token,
                },
              }
            );
            if (response.ok) {
              const projectDetailsData = await response.json();
              setProjectDetails(projectDetailsData);
            } else {
              console.error('Failed to fetch project details');
            }
          } else {
            console.error('Authentication token is missing');
          }
        } catch (error) {
          console.error('Error during project details fetching:', error);
        }
      };

      fetchProjectDetails();
    }
  }, [projectInfo]);


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
          router.push('/users/signIn');
        } else {
          const errorData = await response.json();
          console.error('Logout failed:', errorData);
        }
      } else {
        console.log('Current user is not present in cookies.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
        <nav className='bg-white dark:bg-cyan-700 fixed w-full z-20 top-0 start-0
          border-b border-gray-200 dark:border-gray-600'>
          <div className='flex items-center justify-between w-full md:flex
          md:w-auto md:order-1 navbar' id='navbar-sticky'>
            <ul className='flex flex-col p-5 md:p-0 mt-4 font-medium border
            border-gray-100 rounded-lg bg-green-600 md:space-x-8 rtl:space-x-reverse
            md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-cyan-700
            md:dark:bg-cyan-700 dark:border-gray-700'>
              <Link href='/' className='block py-1 px-2 text-sm	text-white bg-blue-700
              rounded md:bg-transparent md:text-rose-200 md:px-2 md:dark:text-rose-200'
              aria-current='page'>
                Home
              </Link>
              <Link href='/help' className='block py-1 px-2 text-sm	text-gray-900 rounded
              hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-200 md:px-2
              md:dark:hover:text-rose-200 dark:text-white dark:hover:bg-gray-700
              dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                Help
              </Link>
            </ul>
            <div className='flex items-center' style={{ paddingRight: '1rem' }}>
              {isCurrentUserPresent() ? (
                <>
                  <p className='block py-1 px-3 text-sm	text-gray-900 rounded hover:bg-gray-100
                  md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700
                  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700
                  ele-navbar'>
                    Logged in as {Cookies.getJSON('current_user').nick_name}
                  </p>
                  <Link href='/users/myAccount' className='block py-1 px-3 text-sm
                  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                  md:hover:text-rose-200 md:p-0 md:dark:hover:text-rose-200
                  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white
                  md:dark:hover:bg-transparent dark:border-gray-700 ele-navbar'>
                    My Account
                  </Link>
                  <div className='logout'>
                    <button onClick={handleLogout} className='md:dark:hover:text-rose-200
                    text-sm ele-navbar'>
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <Link href='/users/signIn' className='block py-1 px-3 text-gray-900
                rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-200
                md:p-0 md:dark:hover:text-rose-200 dark:text-white dark:hover:bg-gray-700
                dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700
                ele-navbar'>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </nav>

      { isCurrentUserPresent() ? (
        <>
          <div className='second-navbar'>
            <div className='container mx-auto flex items-center justify-between'>
              {projectInfo && projectInfo.projectId ? (
                <div>
                  {projectDetails && <h3>{projectDetails.project.project_name}</h3>}
                  <ul style={{ display: 'flex' }}>
                    {projectDetails && projectDetails.project.issue_tracking && (
                      <li className='nav-li'>
                        <Link href={`/users/${projectInfo.userId}/projects/${projectInfo.projectId}/issues`}>
                          Issues
                        </Link>
                      </li>
                    )}
                    {projectDetails && projectDetails.project.project_news && (
                      <li className='nav-li'>
                        <Link href={`/users/${projectInfo.userId}/projects/${projectInfo.projectId}/news`}>
                          News
                        </Link>
                      </li>
                      )}
                    {projectDetails && projectDetails.project.wiki && (
                      <li className='nav-li'>
                        <Link href={`/users/${projectInfo.userId}/projects/${projectInfo.projectId}/wikis`}>
                          Wiki
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
                ) : (
                <h3>
                  <Link href={`/users/${user_id}/projects`}>
                    Projects
                  </Link>
                </h3>
                )
              }
                <div className='flex items-center'>
                  <input
                    type='text'
                    placeholder='Search...'
                    className='px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
                  />
                  <button className='mx-1 bg-blue-500 text-white px-2 py-1 rounded-md'>
                    <svg className="h-6 w-6 text-white" width="24" height="24"
                      viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                      fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z"/><circle cx="10" cy="10"
                      r="7" />
                      <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                  </button>
                </div>
            </div>
          </div>
        </>
        ) : (
          <div>
          </div>
          )
        }
    </>
  );
};
