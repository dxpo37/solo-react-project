import React, { useState } from 'react'
import { GET_USER } from '../Utils/utils'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import GoogleLogin from 'react-google-login'
import {API_URL} from "../Utils/utils"

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

  const [getUser, { data }] = useLazyQuery(GET_USER, {
    onCompleted: ()=>{ 
      localStorage.token = data.login.token
      window.location.reload(false)
    },
    onError: (data) => setError(data.message)
  })


  
  const responseGoogle = async (response) => {
    console.log(response)
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(response)}
    let serverRes = await fetch(`${API_URL}/login/google`, options)
    let serverData = await serverRes.json()
    localStorage.token = serverData.token
    window.location.reload(false)
  }


   return (
    <Center>
      { error ? <p> {error} </p> : null }
      <input style={{width:"200px"}} onChange={e=>setUsername(e.target.value)} type="text" placeholder="username" />
      <input style={{width:"200px"}} onChange={e=>setPassword(e.target.value)} type="text" placeholder="password" />
      <input style={{width:"200px"}} type="button" value="Login" onClick={ () => { getUser({ variables: {userName:username, password:password}}) }}/>
      <GoogleLogin
        
        clientId="285821445075-d0i1seg4uon357tmqm4nc48m21l58ro6.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Center>
  );
}


