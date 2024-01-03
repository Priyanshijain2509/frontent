"use client"

import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{  }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
