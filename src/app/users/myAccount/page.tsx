'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  language: string;
  nickName: string;
}

export default function MyAccount() {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    language: "English",
    nickName: "",
  });

  const isCurrentUserPresent = () => {
    const currentUser = Cookies.getJSON('current_user');
    return currentUser !== undefined;
  };

  const router = useRouter();

  useEffect(() => {
    const currentUser = Cookies.getJSON('current_user');
    if (currentUser) {
      setUserData({
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        email: currentUser.email,
        password: "",
        passwordConfirmation: "",
        language: currentUser.language || "English",
        nickName: currentUser.nick_name ,
      });
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Cookies.getJSON("current_user").id;
    const formData = {
      user_id: id,
      ...userData,
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': Cookies.get('auth_token')
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User data updated successfully");
        router.push("/home");
      } else {
        console.error("User data update failed");
      }
    } catch (error) {
      console.error("Error during user data update:", error);
    }
  };

  return (
    <>
      { isCurrentUserPresent() ? (
        <div>
          <h1>My Account</h1>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
              />
            </label>

            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </label>

            <label>
              Confirm Password:
              <input
                type="password"
                name="passwordConfirmation"
                value={userData.passwordConfirmation}
                onChange={handleChange}
              />
            </label>

            <label>
              Language:
              <select name="language" value={userData.language} onChange={handleChange}>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </label>

            <label>
              Nick Name:
              <input type="text" name="nickName" value={userData.nickName}
                onChange={handleChange} />
            </label>

            <button type="submit">Update My Account</button>
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
