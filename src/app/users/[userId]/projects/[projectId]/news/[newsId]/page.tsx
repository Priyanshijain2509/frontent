//show News
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
  const { userId, projectId, newsId } = params;
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/news/${newsId}`, {
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
          <h2>News</h2>
          <Link href={`/users/${userId}/projects/${projectId}/news/new}`}>
          <svg className="h-5 w-5 text-blue-600 inline-block" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
          </Link>
          <div className='news-css'>
            <h3>{news.news_title}</h3>
            <p className='newsAddedBy'>Added by {news.news_added_by}, {
            timeDifference(new Date(), new Date(news.created_at))}</p>
            <p className='newsContent'>{news.news_content}</p>
          </div>
        </>
      ) : (
        <h1>Sign In to View News!</h1>
      )}
    </>
  );
}
