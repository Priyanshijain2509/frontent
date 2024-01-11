'use client'

import { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/UserContext';

interface WikiData {
  wiki_text: string;
  updated_by: number;
}

export default function EditWiki({ params }){
  const { userId, projectId, wikiId } =  params;
  const [wikiData, setWikiData] = useState<WikiData>({
    wiki_text: '',
    updated_by: userId
  });
  const [projectName, setProjectName] = useState('');

  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const router = useRouter();

  // set this to access the project details in navbar
  const { setProjectInfo } = useContext(UserContext);
  useEffect(() => {
    setProjectInfo({ projectId, userId });
  }, [params, setProjectInfo]);

  // to fetch the previous wiki data to edit
  useEffect(() => {
    const fetchWikiDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/wikis/${wikiId}`);
        if (response.ok) {
          const data = await response.json();
          setWikiData(data.wiki);
          setProjectName(data.project_name);
        } else {
          console.error('Failed to load wiki data!');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchWikiDetails();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWikiData((prevWikiData) => ({ ...prevWikiData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Cookies.getJSON('current_user').id;
    const formData = {
      ...wikiData,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/projects/${projectId}/wikis/${wikiId}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token')
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Wiki updated successfully');
        router.push(`/users/${userId}/projects/${projectId}/wikis`);
      } else {
        console.error('Wiki updating failed');
      }
    } catch (error) {
      console.error('Error during wiki updating:', error);
    }
  };


  return(
    <>
    { isCurrentUserPresent() ? (
        <div>
          <h1>{projectName}</h1>
          <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md'>

            <div className='mb-4'>
              <label htmlFor='wiki_text' className='text-sm font-medium text-gray-600'>Wiki</label>
              <textarea
                id='wiki_text'
                name='wiki_text'
                value={wikiData.wiki_text}
                onChange={handleChange}
                className='w-full mt-4 p-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>

            <input
              type='hidden'
              id='updated_by'
              name='updated_by'
              value={wikiData.updated_by}
            />

            <div className='mt-4'>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'
              >
                Update Wiki
              </button>
            </div>

          </form>
        </div>
        ) : (
        <div>
          <h1>not logged in!</h1>
        </div>
        )
      }
    </>
  );
}
