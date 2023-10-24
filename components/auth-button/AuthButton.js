import React, { useState } from "react";
import { btn, logout, login } from "./AuthButton.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();
  const [showSignIn, setShowSignIn] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(""); // Add email state
  const [password, setPassword] = useState(""); // Add password state

  const handleUserIconClick = () => {
    setShowSignIn(true);
    setError(null);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the sign-in route with email and password
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        // Redirect or update the UI as needed upon successful sign-in
        // Example: You can use router.push("/dashboard") for client-side routing
        // or update the UI to show the authenticated user's data.
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (session) {
    return (
      <>
        <button className={`${btn} ${logout}`} onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }

  return (
    <div>
      <div>
        <button className={`${btn} ${login}`} onClick={handleUserIconClick}>
          Sign in
        </button>
      </div>

      {showSignIn && (
        <div>
          <form onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder="Email"
              value={email} // Bind input value to email state
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <input
              type="password"
              placeholder="Password"
              value={password} // Bind input value to password state
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            <button type="submit">Sign in</button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </div>
  );
}
