import json
import boto3

def lambda_handler(event,context):
    
    # Setting Variables
    bucket_name = "//bucketname//"
    catkey = event["queryStringParameters"]["key"]
    s3_client = boto3.client('s3')
    
    # Create url
    url = s3_client.generate_presigned_url(
    'get_object',
    Params={'Bucket': bucket_name, 'Key': catkey},
    ExpiresIn=300)
    
    # Return Pre Signed URL
    return {
        'body': json.dumps({'Pre-signed url': url})
    }