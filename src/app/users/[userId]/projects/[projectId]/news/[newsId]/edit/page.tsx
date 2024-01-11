'use client'

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/UserContext';

export default function NewsForm({ params }) {
  const router = useRouter();
  const { userId, projectId, newsId } = params;
  const [news, setNews] = useState({
    news_title: '',
    news_content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews((prevNews) => ({
      ...prevNews,
      [name]: value,
    }));
  };

  // set this to access the project details in navbar
  const { setProjectInfo } = useContext(UserContext);
  useEffect(() => {
    setProjectInfo({ projectId, userId });
  }, [params, setProjectInfo]);

  // to fetch the previous news data to edit
  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/news/${newsId}`);
        if (response.ok) {
          const data = await response.json();
          setNews(data.news);
        } else {
          console.error('Failed to load news data!');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchNewsDetails();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/projects/${projectId}/news/${newsId}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(news),
      });

      if (response.ok) {
        console.log('News updated successfully!');
        router.push(`/users/${userId}/projects/${projectId}/news`);
      } else {
        console.error('Failed to update news');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <h1>News</h1>
      <form onSubmit={handleSubmit} className='max-w-xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md'>
        <div className='mb-4'>
          <label htmlFor='news_title' className='text-sm font-medium text-gray-600'>News Title</label>
          <input
            type='text'
            id='news_title'
            name='news_title'
            value={news.news_title}
            onChange={handleChange}
            className='w-full mt-4 p-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='news_content' className='text-sm font-medium text-gray-600'>News Content</label>
          <textarea
            id='news_content'
            name='news_content'
            value={news.news_content}
            onChange={handleChange}
            className='w-full mt-4 p-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mt-4'>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'>
            Add News
          </button>
        </div>
      </form>
    </>
  );
}
