import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function MyAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [language, setLanguage] = useState("English");
  const [nickName, setNickName] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
    e.preventDefault();
      const id = Cookies.getJSON("current_user").id;
      const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      language: language,
      nick_name: nickName,
    };

    try {
        const response = await fetch(`http://localhost:3000/users/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    <div>
      <h1>My Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>

        <label>
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </label>

        <label>
          Nick Name:
          <input type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} />
        </label>

        <button type="submit">Update My Account</button>
      </form>
    </div>
  );
}