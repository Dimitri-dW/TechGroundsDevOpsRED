import boto3
import time

def lambda_handler(event, context):
    ts = str(time.time())
    bucket = '//bucketname//'
    upload_key = 'cat'+ ts +'.jpg'
    s3 = boto3.client('s3')
    
    
    url = s3.generate_presigned_url(
        ClientMethod='put_object',
        Params={'Bucket': bucket,'Key': upload_key},
            ExpiresIn=300
            )

    # return the result
    return {
        "upload_url": url
    }
