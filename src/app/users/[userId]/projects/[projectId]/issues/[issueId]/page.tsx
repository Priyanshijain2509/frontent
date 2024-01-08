'use client'

import { useEffect, useState } from 'react';

interface Contributor {
  id: number;
  first_name: string;
}

export default function ShowIssue({ params }) {
  const { issueId, projectId, userId } = params;
  const [issue, setIssue] = useState({
    id: issueId,
    tracker: '',
    subject: '',
    issue_status: '',
    issue_description: '',
    category: '',
    start_date: '',
    end_date: '',
    estimated_time: '',
    assignee: '',
    issue_resolved: false,
  });
  const [selectedAssignee, setSelectedAssignee] = useState(issue.assignee);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  // fetching the issue details
  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}/projects/${projectId}/issues/${issueId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIssue(data.issue);
        } else {
          console.error('Failed to fetch issue details');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    if (issueId) {
      fetchIssueDetails();
    }
  }, [issueId]);

  // fetching the project contributors to add issue assignee
  useEffect(() => {
    // Ensure that issue details are fetched before attempting to fetch contributors
    if (issueId && issue.id) {
      const fetchContributors = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}/projects/${projectId}/fetchContributors`);
          if (response.ok) {
            const data = await response.json();
            setContributors(data.contributors);
          } else {
            console.error('Failed to fetch contributors');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };

      fetchContributors();
    }
  }, [projectId, userId, issueId, issue.id]);

  const handleAssigneeChange = (e) => {
    setSelectedAssignee(e.target.value);
  };

  return (
    <>
      <div className='issueShowPage'>
        <h2>Issue Details</h2>
        <div>
          <p>ID: {issue.id}</p>
          <p>Tracker: {issue.tracker}</p>
          <p>Status: {issue.issue_status}</p>
          <p>Subject: {issue.subject}</p>
          <p>Description: {issue.issue_description}</p>
          <p>Assignee: {contributors.map((contributor, index) => (
              <span key={contributor.id}>
                {contributor.first_name}
                {index < contributors.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>

    </>
  );
}