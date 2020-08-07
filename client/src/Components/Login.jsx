import React, { useState } from 'react'
import {GET_TOKEN, loginCompleted} from "../utils"
import styled from "styled-components"
import { useLazyQuery } from '@apollo/client'
import {useHistory} from 'react-router-dom'

const Center = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;`

export default function Login () {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)
  const history = useHistory()

  const [getToken, { data }] = useLazyQuery(GET_TOKEN, {
    onCompleted: ()=>{ localStorage.token = data.login.token;  history.push("/home")},
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


