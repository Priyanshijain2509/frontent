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
          <h2>Projects</h2>
          {projects.map(project => (
            <Link key={project.id} href={`projects/${project.id}`}>
              <div className='project-css'>
                <h1>{project.project_name}</h1>
                <p>{project.project_description}</p>
              </div>
            </Link>
          ))}
        </>
        ):(
          <h1>Sign In to View Projects!</h1>
        )
      }
    </>
  );
}
