import { gql } from '@apollo/client';

export const API_URL = (process.env.NODE_ENV==="development") ? "http://localhost:6777" : "https://solo-react-project.herokuapp.com"

export const GET_TOKEN = gql`
query Token ($userName: String!, $password: String!) {
  login(userName: $userName, password: $password) {
    token
    id
  }
}`

export const GET_POSTS = gql`
  { post
    {
      allPosts
    }
  }`

export const ADD_COMMENT = gql`
  mutation Comment ($postId: Int!, $comment: String!) {
    addComment(postId: $postId, comment:$comment) {
      id
    }
  }`