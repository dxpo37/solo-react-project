import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'
import {Button, Input } from 'antd'
import {useSelector} from 'react-redux'
import {API_URL} from '../utils'
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
  const like = useSelector(state => state.likeReducer)
  const currentUser = useSelector(state => state.userReducer.user)
  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => { messagesEndRef.current.scrollIntoView({ behavior: "auto" }) }
  const onTextChange = e => { setState({ ...state, [e.target.name]: e.target.value }) }

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
    scrollToBottom()
  })

  const sendMessage = e => {
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ message: '', name })
  }

  const renderChat = () => {
    return (
    <div key={"messages"} >
      {chat.map( ({ name, message }, index) =>  <h3 key={index}> {currentUser.userName}: <span>{message}</span> </h3> )}
      <div ref={messagesEndRef} />
    </div>
    )
  }

  return (
    <Position> 
      <MyBox> { renderChat() } </MyBox>
      <Input name="message" onChange={ e => onTextChange(e) } value={state.message} id="outlined-multiline-static" variant="outlined" label="Message" />
      <Button onClick= {sendMessage} style={{width:"92px"}} > Send </Button>
    </Position>
  )
}





