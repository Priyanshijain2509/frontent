'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectContributor({ params }) {
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { userId, projectId, issueId } = params;

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Fetch and set the initially assigned users when the page loads
  useEffect(() => {
    const fetchAssignedUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/projects/${projectId}/fetchContributors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSelectedUsers(data.contributors);
        } else {
          console.error('Failed to fetch assigned users');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchAssignedUsers();
  }, [userId, projectId]);

  const fetchUpdatedContributors = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/projects/${projectId}/fetchContributors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.contributors;
      } else {
        console.error('Failed to fetch updated contributors');
        return [];
      }
    } catch (error) {
      console.error('Error:', error.message);
      return [];
    }
  };

  // search functionality for adding project contributors
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (searchInput.trim() !== '') {
          const response = await fetch(`http://localhost:3000/users/search?email=${searchInput}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsers(data.users);
          } else {
            console.error('Failed to fetch users');
          }
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchUsers();
  }, [searchInput]);

  // select and add the user in project contributor
  const handleUserSelect = async (user: User) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/projects/${projectId}/addContributor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assigned_to: [user.id],
        }),
      });

      if (response.ok) {
        // Fetch the updated list of contributors from the server
        const updatedContributors = await fetchUpdatedContributors();
        setSelectedUsers(updatedContributors);
      } else {
        const data = await response.json();
        setError(data.errors ? data.errors.join(', ') : 'Failed to add contributor');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Failed to add contributor');
    }
  };

  // remove user from project contributor
  const handleRemoveUser = async (user: User) => {
    try {
      // Make an API call to remove the user
      const response = await fetch(
        `http://localhost:3000/users/${userId}/projects/${projectId}/removeContributor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assigned_to: [user.id],
        }),
      });

      if (response.ok) {
        console.log('Contributor removed successfully');
        setSelectedUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      } else {
        const data = await response.json();
        setError(data.errors ? data.errors.join(', ') : 'Failed to remove contributor');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Failed to remove contributor');
    }
  };

  return (
    <>
      <h2>Project Contributor</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
      <div>
        <p>Contributors:</p>
        <ul>
          {selectedUsers.map((contributor) => (
            <li key={contributor.id}>
              {contributor.first_name}
              <button onClick={() => handleRemoveUser(contributor)}>
                <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <br />
      <div>
        <label htmlFor="searchInput">Search by Email:</label>
        <input
          type="text"
          id="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserSelect(user)}>
              {user.email}
            </li>
          ))}
        </ul>

        <div>
          <p>Selected Users:</p>
          <ul>
            {selectedUsers.map((user) => (
              <li key={user.id} onClick={() => handleRemoveUser(user)}>
                {user.email}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}