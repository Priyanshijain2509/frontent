'use client'

import UserContext from '@/context/UserContext';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

interface Overview {
  feature_issue_resolved: number;
  feature_issue_not_resolved: number;
  feature_total: number;
  bug_issue_resolved: number;
  bug_issue_not_resolved: number;
  bug_total: number;
  patch_issue_resolved: number;
  patch_issue_not_resolved: number;
  patch_total: number;
}

export default function ProjectShow({ params }) {
  const { userId, projectId } = params;
  const { setProjectInfo } = useContext(UserContext);
  const [overview, setOverviewData] = useState<Overview[]>([]);

  useEffect(() => {
    setProjectInfo({ projectId, userId });
  }, [params, setProjectInfo]);

  // fetching the projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/overview`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOverviewData(data);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b"></th>
            <th className="py-2 px-4 border-b text-center">Open</th>
            <th className="py-2 px-4 border-b text-center">Closed</th>
            <th className="py-2 px-4 border-b text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b text-center">Bug</td>
            <td className="py-2 px-4 border-b text-center">{overview.bug_issue_resolved}</td>
            <td className="py-2 px-4 border-b text-center">{overview.bug_issue_not_resolved}</td>
            <td className="py-2 px-4 border-b text-center">{overview.bug_total}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b text-center">Feature</td>
            <td className="py-2 px-4 border-b text-center">{overview.feature_issue_resolved}</td>
            <td className="py-2 px-4 border-b text-center">{overview.feature_issue_not_resolved}</td>
            <td className="py-2 px-4 border-b text-center">{overview.feature_total}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b text-center">Patch</td>
            <td className="py-2 px-4 border-b text-center">{overview.patch_issue_resolved}</td>
            <td className="py-2 px-4 border-b text-center">{overview.patch_issue_not_resolved}</td>
            <td className="py-2 px-4 border-b text-center">{overview.patch_total}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}