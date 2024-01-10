'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

interface News {
  id: number;
  news_title: string;
  news_added_by: string;
  created_at: Date;
}

const timeDifference = (current: Date, previous: Date): string => {
  const elapsed = current.getTime() - previous.getTime();
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `about ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `about ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'just now';
  }
};

export default function News({ params }) {
  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };
  const { userId, projectId } = params;
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/news`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNews(data.news);
        } else {
          console.error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchNews();
  }, [userId]);

  return (
    <>
      {isCurrentUserPresent() ? (
        <>
          <div className='flex justify-between items-center'>
            <h2>News</h2>
            <Link href={`/users/${userId}/projects/${projectId}/news/new}`}>
              <div className='flex items-center'>
                <svg className='h-5 w-5 text-green-600 inline-block' viewBox='0 0 24 24'
                  fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'
                  strokeLinejoin='round'>
                  <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                  <line x1='12' y1='8' x2='12' y2='16' />
                  <line x1='8' y1='12' x2='16' y2='12' />
                </svg>
                <span className='ml-2'>Add News</span>
              </div>
            </Link>
          </div>
          {news.map(newsItem => (
            <Link key={newsItem.id} href={`/users/${userId}/projects/${projectId}/news/${newsItem.id}`}>
              <div className='news-css'>
                <h3>{newsItem.news_title}</h3>
                <p>Added by {newsItem.news_added_by}, {timeDifference(new Date(), new Date(newsItem.created_at))}</p>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <h1>Sign In to View News!</h1>
      )}
    </>
  );
}
