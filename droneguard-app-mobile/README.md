# DroneGuard Mobile App 🏖
```
   __  ____                        ____                     _      __ __  
  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \ 
 / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _` | '__/ _` |   / /   \ \
 \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / /
  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/ 

```
# Backend:

Navigate to the debriefing-service/server folder: 
> `$cd ./debriefing-service/server`

Make sure all dependencies are installed & Run Node.js server:
> `$npm install && npm start`

Server runs on http://localhost:3001<br>
Check its status on http://localhost:3001/api/health<br>
Response Example:
```json
{
    "Time": "04/03/2022, 16:02:31",
    "Health": "OK"
}
```

# Mobile App:

Navigate to the droneguard-app folder:
> `$cd ./droneguard-app`

Install all dependencies & Run the app in development mode:
> `$npm install && npm start`

DroneGuard Mobile App is live!<br/> 

**Note**, DroneGuard App Supports:<br/>
- Android 👾
- ~~iOS 🍏~~
## Expo instructions
- Install Expo mobile app [Support Android]
- Add `IP=<your_ip_address>` to your local `.env` file
- Scan QR code from terminal or watch it on your browser<br>
[The page will reload if you make edits]