'use client'

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Spinner = () => {
  return (
    <div className="animate-spin rounded-full border-t-4 border-green-500
    border-opacity-50 border-solid h-4 w-4 inline-block"></div>
  );
};

export default function WelcomePage() {
  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/users/signUp');
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className='welcome-page'>
        <div className='welcome-content'>
          <h2 className='welcome-heading'>Welcome on Redmine!</h2>
          <br />
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
          <br />
          <p>
            Following concerns with the way the feedback and patches from the Redmine
            community were being handled a group of Redmine developers created
            a fork of the project in February 2011. The fork was initially
            named Bluemine, but changed to ChiliProject. After the leader of
            the fork moved on from ChiliProject in 2012 and development and
            maintenance had been announced to shut down, the project was
            officially discontinued in February 2015.
          </p>
          <p>
            Another fork of ChiliProject called OpenProject is active since 2015.
          </p>
          <p>
            Additionally, Easy Redmine (also known as Easy Project), developed by
            Easy Software, functions as an extension to Redmine. Established in
            2006, Easy Redmine offers enhanced features and a mobile application,
            and is available in over 80 countries. It covers various project
            management methodologies and integrates advanced functionalities
            like risk and resource management, Gantt charts, and CRM modules.
            Easy Redmine is being used by the Kazakh state administration, Bosch,
            and the Ministry of Foreign Affairs of the Czech Republic among others.
          </p>
          {isCurrentUserPresent() ? (
            <h2></h2>
          ) : (
            <div className='flex justify-center items-center h-full my-8'>
            <div
              className={`bg-green-50 hover:bg-green-100 focus:outline-none focus:ring
                text-green-600 font-bold py-2 px-4 rounded-md shadow-md
                transition duration-300 ease-in-out cursor-pointer relative`}
              onClick={handleButtonClick}
            >
              {loading && <Spinner />}
              Register
            </div>
          </div>
          )}
        </div>
      </div>

    </>
  );
};
