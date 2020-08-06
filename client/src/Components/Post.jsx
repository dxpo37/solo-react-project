import React, {  useState } from 'react'
import { useMutation } from '@apollo/client';
import styled from 'styled-components'
import { ADD_COMMENT } from "../utils"

const MyDiv = styled.div`
  font-size: 11px;   
  color: rgb(38,38,38);
  width: 555px;  
  border:solid grey 1px;  
  background-color: rgb(243,243,243);
  outline-width: 0;`

export default function Post (props) {

  const [comments, setComments] = useState(props.value.Comments)
  const [comment, setComment] = useState(null)
  const [addComment] = useMutation(ADD_COMMENT)

    return (  
      <MyDiv>                                                     
        <img src={ props.value.photoPath } alt="" style={{width: "550px", padding:"1px 1px"}} />
        <p> { `${props.value.user.userName}: ${props.value.caption}`} </p>
        <p> { comments[0] ? "Comments:":null} </p>
        <div> { comments[0] ?
          comments.map( (comments,i) => <p key={i}> {`${ comments.User.userName }:${ comments.comment }`} </p>)                
        : null } </div>
        <input onChange={ e => setComment( e.target.value ) } type="text" placeholder="comment" style={{width: "400px"}}/>
        <input type="button" value="Comment" onClick={ () => {           
            addComment({ variables: {postId:props.value.id, comment:comment}})
            setComments( [ ...comments, {User: {userName:"deepak"} , comment:comment } ] )

          }}         
          style={{width: "100px"}} />                                                                 
      </MyDiv>
    )
}