'use client'

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [projectInfo, setProjectInfo] = useState(null);

  return (
    <UserContext.Provider value={{ projectInfo, setProjectInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
