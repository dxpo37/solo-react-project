import React, { useState} from 'react'
import {GET_TOKEN, loginCompleted} from "../utils"
import styled from "styled-components"
import { useLazyQuery } from '@apollo/client'

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;`

export default function Login() {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

  const [getToken] = useLazyQuery(GET_TOKEN, {
    onCompleted: loginCompleted,
    onError: (data) => setError("Invalid Credentials")
  })

  return (
    <Center>
      { error ? <p> {error} </p> : null }
      <input onChange={e=>setUsername(e.target.value)} type="text" placeholder="username" />
      <input onChange={e=>setPassword(e.target.value)} type="text" placeholder="password" />
      <input type="button" value="Login" onClick={ () => { getToken({ variables: {userName:username, password:password}})}}/>
    </Center>
  );
}


