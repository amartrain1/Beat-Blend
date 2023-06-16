const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    bio:String!
    comments: [Comment]!
  }
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
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
    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    addComment(commentText: String!): Comment
    addBio(id:ID!, bioText: String!): ID
    updateUser(id: ID!, username: String!, email: String!): User!
    deleteUser(id: ID!): User!
    userName: String
  }
`;

module.exports = typeDefs;