import { gql } from '@apollo/client'

//this will find the user/comments/any query based on typedef using graphQL syntax

export const GET_USER = gql`
query Query {
  getUsers {
    username
    password
    id
    email
  }
}
`


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



