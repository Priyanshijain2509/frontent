'use client'

import { useEffect, useState } from 'react';
import Navbar from "@/app/navbar";

export default function ShowIssue({ params }) {
  const { issueId } = params.issueId;
  const { projectId } = params.projectId;
  const { userId } = params.userId;
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

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const response = await fetch
        (`http://localhost:3000/users/${userId}/projects/${projectId}/issues/${issueId}`, {
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

  return (
    <>
      <Navbar />
      <div>
        <h2>Issue Details</h2>
        <div>
          <p>ID: {issue.id}</p>
          <p>Tracker: {issue.tracker}</p>
          <p>Status: {issue.issue_status}</p>
          <p>Subject: {issue.subject}</p>
          <p>Description: {issue.issue_description}</p>
          <p>Assigned to: {issue.assignee}</p>
        </div>
      </div>
    </>
  );
}