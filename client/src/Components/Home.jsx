import React, { Component, useRef, useState } from 'react'
import { useMutation, useLazyQuery, useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import styled from 'styled-components'
import {GET_POSTS, ADD_COMMENT, loginCompleted, commentCompleted} from "../utils"
import Post from "./Post"
import Nav from "./Nav"
import ChatWindow from "./ChatWindow"

const Center = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;`

export default function Home () {

  const [username, setUsername] = useState(null)


  const { loading, error, data } = useQuery(GET_POSTS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>
    return (
      <>
      <Nav/>
      <Center>
        {
          JSON.parse(data.post.allPosts)
            .map(ele=> <Post value={ele}/> )
        } 
      </Center>
<ChatWindow/>
      </>
    )
}