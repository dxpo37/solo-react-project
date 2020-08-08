import React from 'react'
import Login from './Components/Login'
import Home from './Components/Home'

import { GET_USER } from './utils'
import {setUser} from './Actions/index'
import { useQuery } from '@apollo/client'
import {useDispatch} from 'react-redux'

export default function  App() {

  const dispatch = useDispatch()
  const { data }= useQuery(GET_USER, {
    variables: {userName:"n/a", password:"n/a"},
    onCompleted: () =>  dispatch(setUser(data.login))
  })

return (
    <>
      {localStorage.token ? <Home/>: <Login/>} 
    </>
  )
}

