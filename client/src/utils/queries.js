import { gql } from "@apollo/client";

//this will find the user/comments/any query based on typedef using graphQL syntax

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      name
      username
      password
      id
      email
      bio
      posts {
        _id
        postText
        postAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      comments {
        _id
        CommentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const GET_POSTS = gql`
  query Query {
      getPosts {
    createdAt
    postText
    postAuthor
  }
  }
`;
