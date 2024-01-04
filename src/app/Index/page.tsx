"use client"

import Link from 'next/link';
import Posts from '../../components/posts';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

const Index = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='welcome-page'>
      <h2>Welcome on Redmine!</h2>
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
      <Posts/>
      {user ? (
        <h1>Logged In</h1>
      ) : (
        <div className='welcome-btn'>
          <Link href='/users/sign_up'>Register</Link>
        </div>
      )}
    </div>
  );
};

export default Index;
