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

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, project_id, user_id }) => {
  const [commentData, setCommentData] = useState<CommentData>({
    comment_body: '',
    comment_added_by: Cookies.getJSON('current_user').first_name,
    project_id: project_id,
    user_id: user_id,
    news_id: 0
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
    <form onSubmit={handleSubmit}>
      <label>
        Comment:
        <textarea
          name='comment_body'
          value={commentData.comment_body}
          onChange={handleChange}
        />
      </label>

      <input type='hidden' name='comment_added_by' value={commentData.comment_added_by} />
      <input type='hidden' name='project_id' value={commentData.project_id} />
      <input type='hidden' name='user_id' value={commentData.user_id} />
      <input type='hidden' name='news_id' value={commentData.news_id} />

      <button type='submit'>Submit Comment</button>
    </form>
  );
};

export default CommentForm;