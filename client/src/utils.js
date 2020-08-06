import {  gql } from '@apollo/client';

export const loginCompleted = (data) =>{
  let url
process.env.NODE_ENV==="development" ? url="http://localhost:6777" : url="https://solo-react-project.herokuapp.com/"

  window.location.href = url
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