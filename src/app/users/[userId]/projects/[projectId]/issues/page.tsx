'use client'

import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import UserContext from '@/context/UserContext';

interface Issue {
  id: number;
  tracker: string;
  subject: string;
  issue_description: string;
  category: string;
  start_date: Date;
  end_date: Date;
  estimated_time: number;
  updated_at: Date;
}

export default function Issue({ params }) {
  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const [issues, setIssues] = useState<Issue[]>([]);
  const userId = Cookies.getJSON('current_user').id;
  const projectId = params.projectId;

  // set this to access the project details in navbar
  const { setProjectInfo } = useContext(UserContext);
  useEffect(() => {
    setProjectInfo({ projectId, userId });
  }, [params, setProjectInfo]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/issues`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIssues(data.issues);
        } else {
          console.error('Failed to fetch issues');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchIssues();
  }, [userId]);

  return (
    <>
      {isCurrentUserPresent() ? (
        <>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold'>Issues</h2>
            <div className='flex space-x-4'>
              <Link href={`/users/${userId}/projects/${projectId}/projectContributor`}
                className='new-button'>
                <svg className='h-4 w-5 inline-block' width='24' height='24'
                  viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none'
                  strokeLinecap='round' strokeLinejoin='round'>
                  <path stroke='none' d='M0 0h24v24H0z'/>
                  <line x1='12' y1='5' x2='12' y2='19' />
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
                Project Contributor
              </Link>
              <Link href={`/users/${userId}/projects/${projectId}/issues/new`}
                className='new-button'>
                <svg className='h-4 w-5 inline-block' width='24' height='24'
                  viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none'
                  strokeLinecap='round' strokeLinejoin='round'>
                  <path stroke='none' d='M0 0h24v24H0z'/>
                  <line x1='12' y1='5' x2='12' y2='19' />
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
                Add Issue
              </Link>
            </div>
          </div>
          <div className='flex flex-wrap h-80 overflow-y-auto'>
            {issues.map((issue) => (
              <Link key={issue.id} href={`issues/${issue.id}`}>
                <div className='w-48 border border-gray-300 rounded-md p-4 mb-4
                mr-4 h-full transition-transform transform hover:scale-105'>
                  <h2 className='text-xl font-bold mb-2'>{issue.subject}</h2>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm text-gray-600'>{issue.tracker}</span>
                    <span className='text-sm text-gray-600'>{issue.category}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      {new Date(issue.updated_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>


        </>
      ) : (
        <h1>Sign In to View Issues!</h1>
      )}
    </>
  );
}
