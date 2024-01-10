'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

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
  const user_id = Cookies.getJSON('current_user').id;
  const projectId = params.projectId;

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user_id}/projects/${projectId}/issues`, {
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
  }, [user_id]);

  return (
    <>
      {isCurrentUserPresent() ? (
        <>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold'>Issues</h2>
            <div className='flex space-x-4'>
              <Link href={`/users/${user_id}/projects/${projectId}/projectContributor`}
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
              <Link href={`/users/${user_id}/projects/${projectId}/issues/new`}
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
          <table className='w-full table-auto mt-4'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Id</th>
                <th className='px-4 py-2'>Tracker</th>
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Subject</th>
                <th className='px-4 py-2'>Category</th>
                <th className='px-4 py-2'>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <Link key={issue.id} href={`issues/${issue.id}`}>
                  <tr className='hover:bg-gray-100 cursor-pointer'>
                    <td className='px-4 py-2'>{issue.id}</td>
                    <td className='px-4 py-2'>{issue.tracker}</td>
                    <td className='px-4 py-2'>{/* status here */}</td>
                    <td className='px-4 py-2'>{issue.subject}</td>
                    <td className='px-4 py-2'>{issue.category}</td>
                    <td className='px-4 py-2'>{new Date(issue.updated_at).toLocaleString()}</td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1>Sign In to View Issues!</h1>
      )}
    </>
  );
}
