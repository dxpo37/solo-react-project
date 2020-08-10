import React from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {logOutUser} from '../Actions/index'
import UploadPost from './UploadPost'

const MyDiv = styled.div`
overflow: hidden;
width:100%;
position: fixed;
margin: -9px -8px;
width:100vw;
display:flex;
justify-content: 
space-between;
font-size: 11px;   
color: rgb(38,38,38);
border:solid grey 1px;  
background-color: rgb(243,243,243);
left:9px;   
-width: 0;`

export default function Nav (props) {
  const dispatch = useDispatch()
  const logoutUserHandler = () => {
    dispatch(logOutUser())
    localStorage.removeItem("token")
    window.location.reload(false)
  }
    return (  
      <MyDiv>
      <h1 style={{"paddingLeft":"100px"}}>Logo</h1> 
      <h1 style={{"paddingRight":"100px"}}>Links</h1> 
      <button onClick={logoutUserHandler}>logout</button>
      <UploadPost/>
      </MyDiv>
        )
        }                                              