'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

interface Issue {
  id: number;
  tracker: string;
  subject: string;
  issue_description: string;
  category: string;
  start_date: Date;
  end_date: Date;
  estimated_time: number;
  updated_at: Date;
}

export default function Issue({ params }) {
  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const [issues, setIssues] = useState<Issue[]>([]);
  const user_id = Cookies.getJSON('current_user').id;
  const projectId = params.projectId;

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user_id}/projects/${projectId}/issues`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIssues(data.issues);
        } else {
          console.error('Failed to fetch issues');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchIssues();
  }, [user_id]);

  return (
    <>
      <Link href={`/users/${user_id}/projects/${projectId}/projectContributor`}>Add Project Contributor</Link>
      <Link href={`/users/${user_id}/projects/${projectId}/issues/new`}>Add Issue</Link>
      {isCurrentUserPresent() ? (
        <>
          <h2>Issues</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tracker</th>
                <th>Status</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <Link href={`issues/${issue.id}`}>
                    <td>{issue.id}</td>
                    <td>{issue.tracker}</td>
                    <td>{/* status here */}</td>
                    <td>{issue.subject}</td>
                    <td>{issue.category}</td>
                    <td>{new Date(issue.updated_at).toLocaleString()}</td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1>Sign In to View Issues!</h1>
      )}
    </>
  );
}
