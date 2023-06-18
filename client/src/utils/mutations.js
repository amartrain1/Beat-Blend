import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $username: String, $email: String, $bio: String) {
    updateUser(id: $id, name: $name, username: $username, email: $email, bio: $bio) {
      id
      name
      username
      email
      bio
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation($commentText: String!) {
    addComment(commentText: $commentText) {
      commentText
    }
  }
`;


export const UPDATE_BIO = gql`
mutation AddBio($bioText: String!) {
  addBio(bioText: $bioText) {
    bio
  }
}`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      username
      bio
    }
  }
`;
