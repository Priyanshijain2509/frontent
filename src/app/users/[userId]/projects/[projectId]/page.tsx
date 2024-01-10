'use client'

import Link from 'next/link'

export default function ProjectShow({ params }){
  const { userId, projectId } =  params;
  return (
    <>
      <Link href={`/users/${userId}/projects/${projectId}/issues`}
        className='temp-btn'>Issues</Link>
      <Link href={`/users/${userId}/projects/${projectId}/news`}
      className='temp-btn'>News</Link>
      <Link href={`/users/${userId}/projects/${projectId}/wikis`}
      className='temp-btn'>Wiki</Link>
    </>
  )
}
