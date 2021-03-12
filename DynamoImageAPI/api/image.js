'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const imgeUrl = requestBody.imgeUrl;
  const title = requestBody.title;

  if (typeof imgeUrl !== 'string' || typeof title !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit image because of validation errors.'));
    return;
  }

  submitImage(imageInfo(imgeUrl, title))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted Image with title ${title}`,
          imageId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit image with title ${title}`
        })
      })
    });
};


const submitImage = image => {
  console.log('Submitting image');
  const imageInfo = {
    TableName: process.env.IMAGE_TABLE,
    Item: image,
  };
  return dynamoDb.put(imageInfo).promise()
    .then(res => image);
};

const imageInfo = (imgeUrl, title) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    imgeUrl: imgeUrl,
    title: title,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};

module.exports.listImages = (event,context,callback) =>{

  var parms =  {

    TableName: process.env.IMAGE_TABLE,
    ProjectionExpression: "id, imgeUrl,title"

  };

  console.log("Scaning image table");
  const onScan = (err, data) =>{
          
        if(err){
          console.log("Scan Faild to load data. Error Code Json", JSON.stringify(err,null,2));
          callback(err);
        } else {
          console.log(" Scan Succeeded");
          return callback(null,
          {
            statusCode: 200,
            body:JSON.stringify({
              images: data.Items
            })

          });
        }

  };
  dynamoDb.scan(parms,onScan);

};

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.IMAGE_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch image.'));
      return;
    });
};