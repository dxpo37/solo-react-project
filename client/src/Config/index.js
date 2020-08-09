let awsConfig

if (process.env.NODE_ENV === "development") {
  awsConfig = {
    bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    region: process.env.REACT_APP_AWS_REGION,
    // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
    // dirName: 'media', /* optional */
  }
} else {
  awsConfig = {
    bucketName: process.env.AWS_BUCKET_NAME,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
  }
}

 const envVars = {
  environment: process.env.NODE_ENV || "development",
  awsConfig,
}

export {envVars}