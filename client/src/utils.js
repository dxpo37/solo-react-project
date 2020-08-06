import {  gql } from '@apollo/client';

export const loginCompleted = (data) =>{
  window.location.href = "http://localhost:3000/home"
  localStorage.token = data.login.token
}

export const GET_TOKEN = gql`
query Token($userName: String!, $password: String!){
  login(userName: $userName, password: $password){
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
  mutation Comment($postId: Int!, $comment: String!){
    addComment(postId: $postId, comment:$comment) {
      id
    }
    }`