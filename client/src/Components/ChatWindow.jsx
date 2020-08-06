import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'
import {Button, Input as input} from 'antd'
import {useSelector} from 'react-redux'
// import TextField from '@material-ui/core/TextField'
let url
process.env.NODE_ENV==="development" ? url="http://localhost:6777" : url="https://solo-react-project.herokuapp.com/"

const socket = io(url, {path: "/ws"})

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
  // const like = useSelector(state => state.likeReducer)
  const username = useSelector(state => state.userReducer.username)

  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })

  const onTextChange = e => { setState({ ...state, [e.target.name]: e.target.value }) }

  const sendMessage = e => {
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ message: '', name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index} >
        <h3> {username}: <span>{message}</span> </h3>
      </div>
    ))
  }

  return (
    <Position> 
      <MyBox className="render-chat">{renderChat()}</MyBox>
      <input name="message" onChange={ e => onTextChange(e) } value={state.message} id="outlined-multiline-static" variant="outlined" label="Message" />
      <Button onClick={sendMessage} style={{width:"92px"}}> Send </Button>
    </Position>
  )
}





