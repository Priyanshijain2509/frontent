'use client'

import Cookies from 'js-cookie';
import Link from 'next/link';

export default function WelcomePage(){
  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  return (
    <>
      <div className='welcome-page'>
        <div className='welcome-content'>
          <h2 className='welcome-heading'>Welcome on Redmine!</h2>
          <p>
            Redmine is a free and open source, web-based project management and issue
            tracking tool. It allows users to manage multiple projects and associated
            subprojects. It features per project wikis and forums, time tracking, and
            flexible, role-based access control. It includes a calendar and Gantt charts
            to aid visual representation of projects and their deadlines. Redmine
            integrates with various version control systems and includes a repository
            browser and diff viewer.
          </p>
          <p>
            The design of Redmine is significantly influenced by Trac, a software package
            with some similar features.
            Redmine is written using the Ruby on Rails framework. It is cross-platform
            and cross-database and supports 49 languages.
          </p>
          {isCurrentUserPresent() ? (
            <h2></h2>
          ) : (
            <div className='flex justify-center items-center h-full'>
              <div className='bg-green-50 hover:bg-green-100 focus:outline-none
              focus:ring text-green-600 font-bold py-2 px-4 rounded-md shadow-md
              transition duration-300 ease-in-out'>
                <Link href='/users/signUp'>Register</Link>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
};
