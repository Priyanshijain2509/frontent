'use client'

import { useState, useEffect } from 'react';

interface User{
  id: number;
  email: string;
}

export default function ProjectContributor() {
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
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
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    if (searchInput.trim() !== '') {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchInput]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleAddContributor = () => {
    // Add the selected user to the project's contributors
    if (selectedUser) {
      // Implement the logic to update the project model here
      console.log('Adding contributor:', selectedUser);
    }
  };

  return (
    <>
      <h2>Project Contributor</h2>
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

        {selectedUser && (
          <div>
            <p>Selected User: {selectedUser.email}</p>
            <button onClick={handleAddContributor}>Add as Contributor</button>
          </div>
        )}
      </div>
    </>
  );
}