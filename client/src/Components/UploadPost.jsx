import React from 'react'
// import { Upload, message, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import S3 from 'react-aws-s3'
// import { InboxOutlined } from '@ant-design/icons';
import {envVars} from '../Config/index'

export default function UploadPost() {

  const uploadHandler = async (e) => {
    let awsConfig
    if(!envVars.awsConfig.secretAccessKey){
      const response = await fetch("/aws")
      awsConfig = await response.json()
      console.log("No Token---> but....", awsConfig )
      console.log("No Token---> but....KEYYYY", awsConfig.secretAccessKey )
    }
    else { awsConfig = envVars.awsConfig}
  
    const file = document.querySelector("[name=fileUpload]").files[0]
    let postUrl
    const ReactS3Client = new S3(awsConfig); 
    try { postUrl = await ReactS3Client.uploadFile(file, file.name)}
    catch{ console.log("ZZZZZZZZZZZZZZ", postUrl)}
  }

  return (
    <form method='post' encType='multipart/form-data'>
    <input type='file' name='fileUpload' accept="image/*" />
    <input type="text" name='fileCaption' placeholder="enter caption"/>
    <input type='button' onClick={()=>{uploadHandler()}} name='fileSend' value="submit"/>
  </form>
    )

}











