import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import LogInForm from "./LogInForm/LogInForm";
import SignUpForm from "./SignUpForm/SignUpForm";
import "./landing.css";
import { AnimatePresence } from "framer-motion";
import logo from '../photos/beat_blend_logo_1_transparent.png'
import AuthService from "../../utils/auth";


// GraphQL mutations
const SIGNUP_MUTATION = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

const LOGIN_MUTATION = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

const LandingPage = () => {
  const [signUp, setSignUp] = useState(true);
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const [signUpMutation] = useMutation(SIGNUP_MUTATION);
  const [logInMutation] = useMutation(LOGIN_MUTATION);

  const handleSignUp = async (formData) => {
    console.log(formData); //! REMOVE
    try {
      const { data } = await signUpMutation({ variables: formData });
      const { token } = data.createUser;
      console.log(token); //! REMOVE
      AuthService.login(token);
      navigate("/home");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleLogIn = async (formData) => {
    try {
      const { data } = await logInMutation({ variables: formData });
      const { token } = data.login;
      localStorage.setItem("id_token", token);
      AuthService.login(token);
      navigate("/home");
    } catch (error) {
      console.error(error.message);
      setError('Username or password is incorrect')
    }
  };

  const logInClicked = () => {
    if (!signUp) {
      return;
    }
    setSignUp(false);
    setError('')
  };

  const signUpClicked = () => {
    if (signUp) {
      return;
    }
    setSignUp(true);
    setError('');
  }

  return (
    <div className="mainContainer">
      <div className="inputContainer">
        <div className="buttons">
          <div
            className={signUp ? "btn active" : "btn"}
            onClick={signUpClicked}
          >
            Sign Up
          </div>
          <img className="logo" src={logo} alt="Beat Blend Logo" />
          <div
            className={!signUp ? "btn active" : "btn"}
            onClick={logInClicked}
          >
            Log In
          </div>
        </div>
        <AnimatePresence>
          {signUp ? (
            <SignUpForm handleSignUp={handleSignUp} error={error} setError={setError} />
          ) : (
            <LogInForm handleLogIn={handleLogIn} error={error} setError={setError} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;
