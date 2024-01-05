'use client'

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/navbar';

export default function IssueForm({ params }) {
  const user_id = Cookies.getJSON('current_user').id;
  const router = useRouter();
  const projectId = params.projectId
  const [issue, setIssue] = useState({
    tracker: '',
    subject: '',
    issue_description: '',
    category: '',
    start_date: '',
    end_date: '',
    estimated_time: '',
    assignee: '',
    issue_resolved: false,
    project_id: projectId,
    user_id: user_id,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIssue((prevIssue) => ({
      ...prevIssue,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users/${user_id}/projects/${projectId}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issue),
      });

      if (response.ok) {
        console.log('Issue created successfully!');
        router.push(`/users/${user_id}/projects/${projectId}/issues`);
      } else {
        console.error('Failed to create issue');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md"
      >
        <div className='mb-4'>
          <label htmlFor='tracker' className='text-sm font-medium text-gray-600'>
            Tracker
          </label>
          <select
            id='tracker'
            name='tracker'
            value={issue.tracker}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          >
          <option value=''>Select Tracker</option>
            <option value='bug'>Bug</option>
            <option value='feature'>Feature</option>
            <option value='patch'>Patch</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='subject' className='text-sm font-medium text-gray-600'>
            Subject
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            value={issue.subject}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='issue_description' className='text-sm font-medium text-gray-600'>
            Issue Description
          </label>
          <textarea
            id='issue_description'
            name='issue_description'
            value={issue.issue_description}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='category' className='text-sm font-medium text-gray-600'>
            Category
          </label>
          <select
            id='category'
            name='category'
            value={issue.category}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          >
          <option value=''>Select category</option>
          <option value='Accounts/authentication'>Accounts/authentication</option>
          <option value='Administration'>Administration</option>
          <option value='Attachments'>Attachments</option>
          <option value='Calendar'>Calendar</option>
          <option value='Database'>Database</option>
          <option value='Documentation'>Documentation</option>
          <option value='Email notification'>Email notification</option>
          <option value='Email receiving'>Email receiving</option>
          <option value='Issues'>Issues</option>
          <option value='My Page'>My Page</option>
          <option value='News'>News</option>
          <option value='Project'>Project</option>
          <option value='UI'>UI</option>
          <option value='Wiki'>Wiki</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='start_date' className='text-sm font-medium text-gray-600'>
            Start Date
          </label>
          <input
            type='date'
            id='start_date'
            name='start_date'
            value={issue.start_date}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='end_date' className='text-sm font-medium text-gray-600'>
            End Date
          </label>
          <input
            type='date'
            id='end_date'
            name='end_date'
            value={issue.end_date}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='estimated_time' className='text-sm font-medium text-gray-600'>
            Estimated Time (in hours)
          </label>
          <input
            type='number'
            id='estimated_time'
            name='estimated_time'
            value={issue.estimated_time}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='assignee' className='text-sm font-medium text-gray-600'>
            Assignee
          </label>
          <input
            type='text'
            id='assignee'
            name='assignee'
            value={issue.assignee}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4 flex items-center'>
          <input
            type='checkbox'
            id='issue_resolved'
            name='issue_resolved'
            checked={issue.issue_resolved}
            onChange={handleChange}
            className='mr-2'
          />
          <label htmlFor='issue_resolved' className='text-sm font-medium text-gray-600'>
            Issue Resolved
          </label>
        </div>

        <div className='mb-4'>
          <input
            type='hidden'
            id='project_id'
            name='project_id'
            value={params.projectId}
          />
        </div>

        <input
          type='hidden'
          id='user_id'
          name='user_id'
          value={Cookies.getJSON('current_user').user_id}
        />

        <div className='mt-4'>
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'
          >
            Create Issue
          </button>
        </div>
      </form>
    </>
  );
}