import React from 'react'
import Login from './Login'
import Home from './Home'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './index.css'
// import url("https://cdn.jsdelivr.net/npm/bootstrap-themes@^1.0.2/dist/backstay/index.min.css")
import { GET_USER } from '../Utils/utils'
import {logInUser} from '../Actions/index'
import { useQuery } from '@apollo/client'
import {useDispatch} from 'react-redux'

export default function  App() {

  const dispatch = useDispatch()
  const { data }= useQuery(GET_USER, {
    variables: {userName:"n/a", password:"n/a"},
    onCompleted: () =>  dispatch(logInUser(data.login))
  })

return (
    <>
      {localStorage.token ? <Home/>: <Login/>} 
    </>
  )
}

