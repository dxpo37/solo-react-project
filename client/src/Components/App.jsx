import React from 'react'
import Login from './Login'
import Home from './Home'
import { GET_USER } from '../Utils/utils'
import {logInUser} from '../Actions/index'
import { useQuery } from '@apollo/client'
import {useDispatch} from 'react-redux'

export default function  App() {

  const dispatch = useDispatch()
  const { data }= useQuery(GET_USER, {
    variables: {userName:"n/a", password:"n/a"},
    onCompleted: () =>  {
      console.log("gfd")
      dispatch(logInUser(data.login))
    }
  })

return (
    <>
      {localStorage.token ? <Home/>: <Login/>} 
    </>
  )
}

