# DynamoDb rest api DevOps project RED Team 

REST API in Node.js with AWS Lambda, API Gateway, DynamoDB, and Serverless Framework




## Requirements

1. AWS account
2. Node.js
3. AWS CLI and configure it

## Installation Instructions

1. To install Serverless on your machine, run the below mentioned npm command.

$ npm install serverless -g

2. Clone the repo onto your local development machine using `git clone`.

## Create a REST Resource for Submitting Images

`sls deploy`

## Saving Image Data to DynamoDB

`{"imgeUrl":"Image URL",
   "title": "cat red"}`

   `$ curl -H "Content-Type: application/json" -X POST -d '{"imageUrl":"S3 Image Url","title": "Image Title"}' https://05ccffiraa.execute-api.us-east-1.amazonaws.com/dev/images`



   ### The Response Will be:
   `{
    "message": "Sucessfully submitted Image with title cat red",
    "imageId": "9b801430-831b-11eb-b4ba-8b6523e34f17"
}`


## Get All Images

`$ curl -H "Content-Type: application/json" -X GET  https://05ccffiraa.execute-api.us-east-1.amazonaws.com/dev/images`


## Get Images By ID

`$ curl -H "Content-Type: application/json" -X GET  https://05ccffiraa.execute-api.us-east-1.amazonaws.com/dev/images/{id}`




