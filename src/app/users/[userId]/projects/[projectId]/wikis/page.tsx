'use client'

import { useState, useEffect, useContext } from 'react';
import UserContext from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Wiki({ params }) {
  const router = useRouter();
  const { userId, projectId } = params;
  const [wiki, setWiki] = useState({
    wiki_text: '',
    project_id: projectId,
    created_by: userId,
  });
  const [existingWiki, setExistingWiki] = useState(null);
  const [projectName, setProjectName] = useState('');

  // set this to access the project details in navbar
  const { setProjectInfo } = useContext(UserContext);
  useEffect(() => {
    setProjectInfo({ projectId, userId });
  }, [params, setProjectInfo]);

  // fetch theb existing wikis
  useEffect(() => {
    const checkExistingWiki = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}/projects/${projectId}/wikis`);
        if (response.ok) {
          const data = await response.json();
          // Check if the response contains a Wiki
          if (data.wiki) {
            setExistingWiki(data.wiki);
            setProjectName(data.project_name);
          }
        } else {
          console.error('Failed to check existing wiki');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    checkExistingWiki();
  }, [userId, projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWiki((prevWiki) => ({
      ...prevWiki,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}/projects/${projectId}/wikis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wiki),
      });

      if (response.ok) {
        console.log('Wiki created successfully!');
        router.push(`/users/${userId}/projects/${projectId}/wikis`);
      } else {
        console.error('Failed to create wiki');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      {existingWiki ? (
        <>
        <Link href={`/users/${userId}/projects/${projectId}/wikis/${existingWiki.id}/edit`}>
          <svg className='h-5 w-5 text-blue-600 inline-block' viewBox='0 0 24 24'
            stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round'
              stroke-linejoin='round'>  <path stroke='none' d='M0 0h24v24H0z'/>
              <path d='M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' />
              <path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' />
              <line x1='16' y1='5' x2='19' y2='8' />
          </svg>
        </Link>
        <div className='wikiPage'>
          <h1>{projectName}</h1>
          <div>{existingWiki.wiki_text}</div>
        </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className='max-w-xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md'>
          {/* Wiki form */}
          <div className='mb-4'>
            <label htmlFor='wiki_text' className='text-sm font-medium text-gray-600'>Wiki</label>
            <textarea
              id='wiki_text'
              name='wiki_text'
              value={wiki.wiki_text}
              onChange={handleChange}
              className='w-full mt-4 p-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>

          <input
            type='hidden'
            id='project_id'
            name='project_id'
            value={wiki.project_id}
          />
          <input
            type='hidden'
            id='created_by'
            name='created_by'
            value={wiki.created_by}
          />

          <div className='mt-4'>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'>
              Create Wiki
            </button>
          </div>
        </form>
      )}
    </>
  );
}
