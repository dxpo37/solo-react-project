import React from 'react'
// import { useMutation } from '@apollo/client'
import {envVars} from '../Config/index'
const AWS = require('aws-sdk');
// import { CREATE_POST } from "../Utils/utils"
// const [makePost] = useMutation(MAKE_POST)

export default function UploadPost() {

  const awsUploadHandler = async () => {
    const file = document.querySelector("[name=fileUpload]").files[0]
    let awsConfig 

    if(!envVars.awsConfig.secretAccessKey){
      const resJSON = await fetch("/aws")
      const resObj = await resJSON.json()
      awsConfig = resObj.aws
    }
    else { awsConfig = envVars.awsConfig }

    AWS.config.update(awsConfig)
    const upload = new AWS.S3.ManagedUpload({ params: { Bucket: awsConfig.bucketName, Key: file.name, Body: file, ACL: "public-read" } })
    
    try { const resObj = await upload.promise() } //makePost({variables???})
    catch { throw new Error("upload failed"); alert("upload failed") }
  }

  return (
      <form method='post' encType='multipart/form-data'>
      <input type='file' name='fileUpload' accept="image/*" style={{border:"1px solid black", width:"200px"}}/>
      <div>
        <input type="text" style={{border:"1px solid black"}} placeholder="enter caption"/>
        <button type='button' onClick={()=>{awsUploadHandler()}} name='fileSend'>Post</button>
      </div>
    </form>
    )
}