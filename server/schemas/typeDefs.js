const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    username: String!
    email: String!
    password: String!
    bio: String
    comments: [Comment]
    posts: [Post]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    postAudio: String
    createdAt: String!
    comments: [Comment]
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    getUser(id: ID!): User!
    getUsers: [User!]!
    getComments: [Comment]
    getComment(id: ID): Comment
    getPost(id: ID!): Post!
    getPosts: [Post!]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    addComment(commentText: String!): Comment
    addBio(bioText: String!): User
    updateUser(id: ID!, name: String, username: String, email: String, bio: String): User!
    deleteUser(id: ID!): User!
    userName: String
    addPost(postText: String!): Post
  }
`;

module.exports = typeDefs;
