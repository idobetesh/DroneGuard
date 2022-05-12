import json
import urllib.parse
import boto3
import requests

print('Loading function')

s3 = boto3.resource('s3')
exists = False

base_debriefing_url = 'https://droneguard-debriefing-server.herokuapp.com/api'
login_url = f"{base_debriefing_url}/user/login"
records_url = f"{base_debriefing_url}/record"
s3_bucket_url = "https://drone-guard-debriefing.s3.eu-west-1.amazonaws.com"

def lambda_handler(event, context):
    
    # Get the object from the event and show its content type
    src_bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    parsed_key = key.split(".")
    second_key = ""
    
    if parsed_key[1] == "mp4":
        second_key = parsed_key[0] + '.png'
    elif parsed_key[1] == "png":
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
        # Copying both items to drone-guard-debriefing
        s3.meta.client.copy(copy_item1, 'drone-guard-debriefing', key)
        s3.meta.client.copy(copy_item2, 'drone-guard-debriefing', second_key)
        
        # Deleting both items from the mid bucket
        s3.meta.client.delete_object(Bucket=src_bucket, Key=key)
        s3.meta.client.delete_object(Bucket=src_bucket, Key=second_key)
        
        # Log in as admin
        login_body_req = {
        "email": "email",
        "password": "password"
        }   
        
        login_res = requests.post(login_url, data=login_body_req)
        if login_res.status_code == 200:
            token = login_res.json()['token']
            if token:
                heds = {'Authorization': f"Bearer {token}"}
                get_records_res = requests.get(records_url, headers=heds)
                list_of_all_values = [value for elem in get_records_res.json()
                      for value in elem.values()]
                if key not in list_of_all_values:
                    add_record_body = {
                        "url": f"{s3_bucket_url}/{parsed_key[0]}.mp4",
                        "thumbnailUrl": f"{s3_bucket_url}/{parsed_key[0]}.png"
                    }
                    add_record_res = requests.post(records_url, 
                    data=add_record_body, 
                    headers=heds)
            
    
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, src_bucket))
        raise e
              