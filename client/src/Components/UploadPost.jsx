import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import {envVars} from '../Config/index'
import {useSelector} from 'react-redux'
import { MAKE_POST} from "../Utils/utils"
const AWS = require('aws-sdk');
// const [makePost] = useMutation(MAKE_POST)
const Position = styled.div`
  position: fixed;
  bottom: 5px;
  left: 5px;`

export default function UploadPost() {

  const currentUser = useSelector(state => state.userReducer.user)
  const [makePost] = useMutation(MAKE_POST)

  const awsUploadHandler = async () => {
    const file = document.querySelector("[name=fileUpload]").files[0]
    const caption = document.querySelector("[name=caption]").value
    
    let awsConfig 

    if(!envVars.awsConfig.secretAccessKey){
      const resJSON = await fetch("/aws")
      const resObj = await resJSON.json()
      awsConfig = resObj.aws
    }
    else { awsConfig = envVars.awsConfig }

    AWS.config.update(awsConfig)
    const upload = new AWS.S3.ManagedUpload({ params: { Bucket: awsConfig.bucketName, Key: file.name, Body: file, ACL: "public-read" } })
    
    try { const resObj = await upload.promise() 
          makePost({ variables: {userId: currentUser.id, caption:caption, photoPath:resObj.Location }})
          window.location.reload(false)
    } 
    catch { throw new Error("upload failed"); alert("upload failed") }
  }

  return (
    <Position>
      <form method='post' encType='multipart/form-data'>
      <input type='file' name='fileUpload' accept="image/*" style={{border:"1px solid black", width:"200px"}}/>
      <div>
        <input type="text" style={{border:"1px solid black"}} name='caption' placeholder="enter caption"/>
        <button type='button' onClick={()=>{awsUploadHandler()}} name='fileSend'>Post</button>
      </div>
    </form>
    </Position>
    )
}