import urllib.parse
import boto3

print('Loading function')

s3 = boto3.resource('s3')


def lambda_handler(event, context):
    
    # Get the object from the event and show its content type
    src_bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    parsed_key = key.split('.')
    second_key = ''
    
    if parsed_key[1] == 'mp4':
        second_key = parsed_key[0] + '.png'
    elif parsed_key[1] == 'png':
        second_key = parsed_key[0] + '.mp4'
    
    copy_item1 = {
            'Bucket': src_bucket,
            'Key': key
        }
    copy_item2 = {
            'Bucket': src_bucket,
            'Key': second_key
        }
        
    try:
        print(key, second_key)
        # Copying both items to drone-guard-debriefing
        s3.meta.client.copy(copy_item1, 'drone-guard-debriefing', key)
        s3.meta.client.copy(copy_item2, 'drone-guard-debriefing', second_key)
        
        # Deleting both items from the mid bucket
        s3.meta.client.delete_object(Bucket=src_bucket, Key=key)
        s3.meta.client.delete_object(Bucket=src_bucket, Key=second_key)
    
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, src_bucket))
        raise e
              
