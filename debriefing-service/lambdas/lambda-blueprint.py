import requests

def lambda_handler():
    base_url = 'http://localhost:3001/api/'

    # SECRETS
    email = input('Enter email')
    password = input('Enter password')
    
    try:
        if password and email:
            data = {
                'email': email,
                'password': password
            }

            response = requests.post(f'{base_url}user/login/', data=data)
            token = response.json()['token']

        if token:
            heds = {'Authorization': f"Bearer {token}"}
            data = {
                'url': 'get-it-from-bucket-(mp4)',
                'thumbnailUrl': 'get-it-from-bucket-(png)'
            }

            response = requests.post(f'{base_url}record/', data=data, headers=heds)
    except:
        print('Something went wrong')

if __name__ == '__main__':
    lambda_handler()