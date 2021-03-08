import boto3
import json
from boto3 import client

bucket = client('s3')
bucket_name = '//bucketname//'

def lambda_handler(event, context):
    output = []
    for key in bucket.list_objects(Bucket=bucket_name)['Contents']:
        output.append(key['Key'])
    return {
        'keys': {"cats": output}
    }
