'use client'

import { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/UserContext';

interface IssueData {
  tracker: string;
  subject: string;
  issue_description: string;
  category: string;
  start_date: Date | null;
  end_date: Date | null;
  estimated_time: number | null;
  assignee: []
}
interface Contributor {
  id: number;
  email: string;
  first_name: string;
}

export default function editIssueForm({ params }){
  const { userId, projectId, issueId } =  params;
  const [issueData, setIssueData] = useState<IssueData>({
    tracker: '',
    subject: '',
    issue_description: '',
    category: '',
    start_date: null,
    end_date: null ,
    estimated_time: null ,
    assignee: []
  });

  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  // set this to access the project details in navbar
  const { setProjectInfo } = useContext(UserContext);
  useEffect(() => {
    setProjectInfo({ projectId, userId });
  }, [params, setProjectInfo]);

  const router = useRouter();

  const [selectedAssignee, setSelectedAssignee] = useState<string[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  // fetching the project contributors to add issue assignee
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await
        fetch(`http://localhost:3000/users/${userId}/projects/${projectId}/fetchContributors`);
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
  }, [projectId, issueId]);

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option: HTMLOptionElement) => parseInt(option.value, 10)
    );
    setSelectedAssignee(selectedOptions);
  };

  // to fetch the previous issue values to edit
  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/issues/${issueId}`);
        if (response.ok) {
          const data = await response.json();
          setIssueData(data.issue);
        } else {
          console.error('Failed to issue details');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchIssueDetails();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIssueData((prevIssueData) => ({ ...prevIssueData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Cookies.getJSON('current_user').id;
    const formData = {
      user_id: id,
      ...issueData,
      assignee: selectedAssignee,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/projects/${projectId}/issues/${issueId}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token')
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Issue updated successfully');
        router.push(`/users/${userId}/projects/${projectId}/issues/${issueId}`);
      } else {
        console.error('Issue updating failed');
      }
    } catch (error) {
      console.error('Error during issue updating:', error);
    }
  };


  return(
    <>
    { isCurrentUserPresent() ? (
        <div>
          <h1>Issue Update</h1>
          <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md'>
            <div className='mb-4'>
              <label htmlFor='tracker' className='text-sm font-medium text-gray-600'>
                Tracker
              </label>
              <select
                id='tracker'
                name='tracker'
                value={issueData.tracker}
                onChange={handleChange}
                className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              >
              <option value=''>Select Tracker</option>
                <option value='bug'>Bug</option>
                <option value='feature'>Feature</option>
                <option value='patch'>Patch</option>
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor='subject' className='text-sm font-medium text-gray-600'>
                Subject
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={issueData.subject}
                onChange={handleChange}
                className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='issue_description' className='text-sm font-medium text-gray-600'>
                Issue Description
              </label>
              <textarea
                id='issue_description'
                name='issue_description'
                value={issueData.issue_description}
                onChange={handleChange}
                className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='category' className='text-sm font-medium text-gray-600'>
                Category
              </label>
              <select
                id='category'
                name='category'
                value={issueData.category}
                onChange={handleChange}
                className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              >
              <option value=''>Select category</option>
              <option value='Accounts/authentication'>Accounts/authentication</option>
              <option value='Administration'>Administration</option>
              <option value='Attachments'>Attachments</option>
              <option value='Calendar'>Calendar</option>
              <option value='Database'>Database</option>
              <option value='Documentation'>Documentation</option>
              <option value='Email notification'>Email notification</option>
              <option value='Email receiving'>Email receiving</option>
              <option value='Issues'>Issues</option>
              <option value='My Page'>My Page</option>
              <option value='News'>News</option>
              <option value='Project'>Project</option>
              <option value='UI'>UI</option>
              <option value='Wiki'>Wiki</option>
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor='start_date' className='text-sm font-medium text-gray-600'>
                Start Date
              </label>
              <input
                type='Date'
                id='start_date'
                name='start_date'
                value={issueData.start_date}
                onChange={handleChange}
                className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='end_date' className='text-sm font-medium text-gray-600'>
                End Date
              </label>
              <input
                type='date'
                id='end_date'
                name='end_date'
                value={issueData.end_date}
                onChange={handleChange}
                className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='estimated_time' className='text-sm font-medium text-gray-600'>
                Estimated Time (in hours)
              </label>
              <input
                type='number'
                id='estimated_time'
                name='estimated_time'
                value={issueData.estimated_time}
                onChange={handleChange}
                className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='assignee' className='text-sm font-medium text-gray-600'>
                Assignee
              </label>
              <select
                id='assignee'
                value={selectedAssignee}
                onChange={handleAssigneeChange}
                multiple
                className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              >
                {contributors.map((contributor) => (
                  <option key={contributor.id} value={contributor.id}>
                    {contributor.first_name}
                  </option>
                ))}
              </select>
            </div>

            <div className='mt-4'>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'
              >
                Edit Issue
              </button>
            </div>

          </form>
        </div>
        ) : (
        <div>
          <h1>not logged in!</h1>
        </div>
        )
      }
    </>
  );
}
