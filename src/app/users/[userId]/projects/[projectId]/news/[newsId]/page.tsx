//show News
'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import CommentForm from './comments/new/page';

interface News {
  id: number;
  news_title: string;
  news_added_by: string;
  created_at: Date;
}
interface Comment {
  id: number;
  comment_body: string;
  comment_added_by: string;
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
  const [news, setNews] = useState<News | null>(null);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/news/${newsId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

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

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchNewsAndComments = async () => {
      try {
        // Fetch news
        const newsResponse = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/news/${newsId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          setNews(newsData.news);

          // Fetch comments
          const commentsResponse = await fetch(
            `http://localhost:3000/users/${userId}/projects/${projectId}/news/${newsId}/comments`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (commentsResponse.ok) {
            const commentsData = await commentsResponse.json();
            setComments(commentsData.comments);
          } else {
            console.error('Failed to fetch comments');
          }
        } else {
          console.error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchNewsAndComments();
  }, [userId]);


  const submitComment = async (commentData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/projects/${projectId}/news/${newsId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...commentData,
            user_id: userId,
            news_id: newsId,
          }),
        }
      );

      if (response.ok) {
        console.log('Comment submitted successfully!');
      } else {
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      {isCurrentUserPresent() ? (
        <>
          <h2>News</h2>
          <div className='news-css'>
            <h3>{news?.news_title}</h3>
            <p className='newsAddedBy'>
              Added by {news?.news_added_by}, {timeDifference(new Date(), new
                Date(news?.created_at))}
            </p>
            <p className='newsContent'>{news?.news_content}</p>
          </div>

          <h2>Comments:</h2>
          <button onClick={() => setShowCommentForm(!showCommentForm)}>Add a Comment</button>

          {comments.length > 0 && (
            <div>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.comment_body}</p>
                  <p>Added by {comment.comment_added_by}, {timeDifference(new Date(),
                  new Date(comment.created_at))}</p>
                </div>
              ))}
            </div>
          )}

          {showCommentForm && (
            <CommentForm
              onSubmit={submitComment} project_id={projectId} user_id={userId} news_id={newsId}
            />
          )}

        </>
      ) : (
        <h1>Sign In to View News!</h1>
      )}
    </>
  );
}