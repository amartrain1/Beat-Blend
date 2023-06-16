import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String!, $email: String!) {
    updateUser(id: $id, username: $username, email: $email) {
      id
      username
      email
    }
  }
`;
