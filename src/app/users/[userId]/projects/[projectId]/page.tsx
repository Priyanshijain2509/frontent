'use client'

import UserContext from '@/context/UserContext';
import Link from 'next/link';
import { useContext, useEffect } from 'react';

export default function ProjectShow({ params }) {
  const { userId, projectId } = params;
  const { setProjectInfo } = useContext(UserContext);

  useEffect(() => {
    setProjectInfo({ projectId, userId });
  }, [params, setProjectInfo]);

  return (
    <>
      <Link href={`/users/${userId}/projects/${projectId}/issues`} className='temp-btn'>
        Issues
      </Link>
      <Link href={`/users/${userId}/projects/${projectId}/news`} className='temp-btn'>
        News
      </Link>
      <Link href={`/users/${userId}/projects/${projectId}/wikis`} className='temp-btn'>
        Wiki
      </Link>
    </>
  );
}
