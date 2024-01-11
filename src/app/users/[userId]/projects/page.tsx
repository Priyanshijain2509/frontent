'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

interface Project {
  id: number;
  project_name: string;
  project_description: string;
}

export default function Project() {
  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };
  const [projects, setProjects] = useState<Project[]>([]);
  const user_id = Cookies.getJSON('current_user').id;

  // fetching the projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user_id}/projects`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchProjects();
  }, [user_id]);

  return (
    <>
      {isCurrentUserPresent() ? (
        <>
          <div className='flex justify-between items-center'>
            <h2 className='flex-shrink-0'>Projects</h2>
            <Link href={`/users/${user_id}/projects/new`} className='new-button'>
              <svg className='h-4 w-5 inline-block' width='24' height='24'
                viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none'
                strokeLinecap='round' strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z'/>
                <line x1='12' y1='5' x2='12' y2='19' />
                <line x1='5' y1='12' x2='19' y2='12' />
              </svg>
              Add Project
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className='flash-error'>No projects yet.</p>
          ) : (
            projects.map((project) => (
              <Link key={project.id} href={`projects/${project.id}`}>
                <div className='project-css'>
                  <h1>{project.project_name}</h1>
                  <p>{project.project_description}</p>
                </div>
              </Link>
            ))
          )}
        </>
      ) : (
        <h1>Sign In to View Projects!</h1>
      )}
    </>
  );
}