import React, { useState } from 'react'
import { GET_USER } from '../utils'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import {useDispatch} from 'react-redux'
import {setUser} from '../Actions/index'

const Center = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;`

export default function Login () {
  const dispatch = useDispatch()
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

  const [getUser, { data }] = useLazyQuery(GET_USER, {
    onCompleted: ()=>{ 
      localStorage.token = data.login.token
      dispatch(setUser(data.login))
      window.location.reload(false);
    },
    onError: (data) => setError(data.message)
  })

  return (
    <Center>
      { error ? <p> {error} </p> : null }
      <input onChange={e=>setUsername(e.target.value)} type="text" placeholder="username" />
      <input onChange={e=>setPassword(e.target.value)} type="text" placeholder="password" />
      <input type="button" value="Login" onClick={ () => { getUser({ variables: {userName:username, password:password}}) }}/>
    </Center>
  );
}


