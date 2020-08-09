import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'
import {Button} from 'antd'
import {useSelector} from 'react-redux'
import {API_URL} from '../Utils/utils'
// import TextField from '@material-ui/core/TextField'

const socket = io(API_URL, {path: "/ws"})

const Position = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;`

const MyBox = styled.div`
  font-size: 11px;  
  height: 111px;  
  color: rgb(38,38,38);
  width: 255px;  
  border:solid grey 1px;  
  background-color: rgb(243,243,243);
  left:9px;  
  top: -8px;  
  outline-width: 0;
  overflow-y:auto;`

export default function ChatWindow() {
 
  const currentUser = useSelector(state => state.userReducer.user)
  const [currentMessage, setCurrentMessage] = useState(null)
  const [chatArray, setChatArray] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => { messagesEndRef.current.scrollIntoView({ behavior: "auto" }) }
  const onTextChange = e => {  setCurrentMessage( e.target.value ) }

  useEffect(() => {
    socket.on('message', ({ user, message }) => {  setChatArray([...chatArray, {user, message}])  })
    scrollToBottom()
  })

  const sendMessage = e => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = ""))
    socket.emit('message', { user:currentUser.userName, message:currentMessage })
  }

  const renderChat = () => {
    return (
    <div key={"messages"} >
      {chatArray.map( ({ user, message }, index) =>  <h3 key={index}> {user}: <span>{message}</span> </h3> )}
      <div ref={messagesEndRef} />
    </div>
    )
  }

  return (
    <Position> 
      <MyBox> { renderChat() } </MyBox>
      <input name="message" onChange={ e => onTextChange(e) } id="outlined-multiline-static" variant="outlined" label="Message" />
      <Button onClick= {sendMessage} style={{width:"92px"}} > Send </Button>
    </Position>
  )
}





