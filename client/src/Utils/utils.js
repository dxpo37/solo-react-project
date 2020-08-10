import { gql } from '@apollo/client';

export const API_URL = (process.env.NODE_ENV==="development") ? "http://localhost:6777" : "https://solo-react-project.herokuapp.com"






export const GET_USER = gql`
query Token ($userName: String!, $password: String!) {
  login(userName: $userName, password: $password) {
    id
    userName
    firstName
    profilePicPath
    email
    token
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

  export const MAKE_POST = gql`
  mutation Post ($userId: Int!, $caption: String!, $photoPath: String!) {
    makePost(userId: $userId, caption:$caption, photoPath:$photoPath) {
      allPosts
    }
  }`