import React, { useState } from "react";

const LogInForm = ({ handleLogIn, error, setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogIn({ email, password });
  };

  return (
    <div
      className="animateDiv"
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit" type="submit">
          Log In
        </button>
        {error && <p className="alertText"><i>{error}</i></p>}
      </form>
    </div>
  );
};

export default LogInForm;
