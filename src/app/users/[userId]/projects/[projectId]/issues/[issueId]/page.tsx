'use client'

import React, { useEffect, useState, useContext } from 'react';
import UserContext from '@/context/UserContext';

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
    assignee: [],
    issue_resolved: false,
  });

  const [assigneeDetails, setAssigneeDetails] = useState([]);

  // set this to access the project details in navbar
  const { setProjectInfo } = useContext(UserContext);
  useEffect(() => {
    setProjectInfo({ projectId, userId });
  }, [params, setProjectInfo]);

  // Fetch issue details
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

          // Fetch assignee details based on user IDs
          const assigneeIds = data.issue.assignee;
          const assigneePromises = assigneeIds.map(async (assigneeId) => {
            const userResponse = await fetch(`http://localhost:3000/users/${assigneeId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (userResponse.ok) {
              const userData = await userResponse.json();
              return userData.user;
            } else {
              console.error(`Failed to fetch user details for ID ${assigneeId}`);
              return null;
            }
          });

          // Wait for all user details to be fetched
          const assigneeData = await Promise.all(assigneePromises);
          setAssigneeDetails(assigneeData);
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

  const handleIssueResolved = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/projects/${projectId}/issues/${issueId}/resolve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issue_resolved: !issue.issue_resolved }),
      });

      if (response.ok) {
        setIssue((prevIssue) => ({ ...prevIssue, issue_resolved: !prevIssue.issue_resolved }));
      } else {
        console.error('Failed to mark issue as resolved/unresolved');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <button onClick={handleIssueResolved}>
        {issue.issue_resolved ? 'Mark as unresolved' : 'Mark as resolved'}
      </button>
      <div className='issueShowPage'>
        <h2>Issue Details</h2>
        <div>
          <p>ID: {issue.id}</p>
          <p>Tracker: {issue.tracker}</p>
          <p>Status: {issue.issue_status}</p>
          <p>Subject: {issue.subject}</p>
          <p>Description: {issue.issue_description}</p>
          <p>
            Assignee: {assigneeDetails.map((assignee) => (
              <span key={assignee.id}>{assignee.first_name}</span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
