'use client'

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function ProjectForm() {
  const user_id = Cookies.getJSON('current_user').id;
  const router = useRouter();
  const [project, setProject] = useState({
    project_name: '',
    project_description: '',
    identifier: '',
    public: false,
    issue_tracking: false,
    project_news: false,
    wiki: false,
    user_id: user_id,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users/${user_id}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        console.log('Project created successfully!');
        router.push(`/users/${user_id}/projects`);
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md'>
        <div className='mb-4'>
          <label htmlFor='project_name' className='text-sm font-medium text-gray-600'>Project Name</label>
          <input
            type='text'
            id='project_name'
            name='project_name'
            value={project.project_name}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='project_description' className='text-sm font-medium text-gray-600'>Project Description</label>
          <textarea
            id='project_description'
            name='project_description'
            value={project.project_description}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='identifier' className='text-sm font-medium text-gray-600'>Identifier</label>
          <input
            type='text'
            id='identifier'
            name='identifier'
            value={project.identifier}
            onChange={handleChange}
            className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4 flex items-center'>
          <input
            type='checkbox'
            id='public'
            name='public'
            checked={project.public}
            onChange={handleChange}
            className='mr-2'
          />
          <label htmlFor='public' className='text-sm font-medium text-gray-600'>Public</label>
        </div>

        <div className='mb-4 modules'>
          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='issue_tracking'
              name='issue_tracking'
              checked={project.issue_tracking}
              onChange={handleChange}
              className='mr-2'
            />
            <label htmlFor='issue_tracking' className='text-sm font-medium text-gray-600'>Issue Tracking</label>
          </div>

          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='project_news'
              name='project_news'
              checked={project.project_news}
              onChange={handleChange}
              className='mr-2'
            />
            <label htmlFor='project_news' className='text-sm font-medium text-gray-600'>News</label>
          </div>

          <div className='flex items-center'>
            <input
              type='checkbox'
              id='wiki'
              name='wiki'
              checked={project.wiki}
              onChange={handleChange}
              className='mr-2'
            />
            <label htmlFor='wiki' className='text-sm font-medium text-gray-600'>Wiki</label>
          </div>
        </div>

        <input
          type='hidden'
          id='user_id'
          name='user_id'
          value={project.user_id}
        />

        <div className='mt-4'>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'>
            Create Project
          </button>
        </div>
      </form>
    </>
  );
};
