'use client'

import React, { useState } from 'react';
import Cookies from 'js-cookie';

interface CommentFormProps {
  onSubmit: (commentData: CommentData) => void;
  project_id: number;
  user_id: number;
  news_id: number;
}

interface CommentData {
  comment_body: string;
  comment_added_by: string;
  project_id: number;
  user_id: number;
  news_id: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, project_id, user_id, news_id }) => {
  const [commentData, setCommentData] = useState<CommentData>({
    comment_body: '',
    comment_added_by: Cookies.getJSON('current_user').first_name,
    project_id: project_id,
    user_id: user_id,
    news_id: news_id
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(commentData);
    setCommentData({ comment_body: '' });
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md p-4 bg-white rounded shadow-md'>
      <label className='block mb-4'>
        <textarea
          name='comment_body'
          value={commentData.comment_body}
          onChange={handleChange}
          className='form-textarea mt-1 block w-full border-2 rounded'
          rows='3'
        />
      </label>

      <input type='hidden' name='comment_added_by' value={commentData.comment_added_by} />
      <input type='hidden' name='project_id' value={commentData.project_id} />
      <input type='hidden' name='user_id' value={commentData.user_id} />
      <input type='hidden' name='news_id' value={commentData.news_id} />

      <button
        type='submit'
        className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700
        focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
      >
        Submit Comment
      </button>
    </form>

  );
};

export default CommentForm;
