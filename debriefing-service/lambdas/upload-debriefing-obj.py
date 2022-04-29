import json
import requests

def lambda_handler(event, context):
    url="http://localhost:3001/api/user/login"
    email = ''
    password = ''
    requestBody = {}
    
    try:
        print(event)
        if event.get('body'):
            requestBody = json.loads(event["body"])
            
        if requestBody.get('email') and requestBody.get('password'):
            email = requestBody['email']
            password = requestBody['password']
        
        if password and email:
            res = requests.post(url, body={'email': email, 'password': password})
            print(res)
        
    except:
        return {
            'statusCode': 400,
            'error': json.dumps('Error accured')
        }
    return {
        'statusCode': 200,
        'body': json.dumps({
            "email": email,
            "password": password
        })
    }
