# DroneGuard Debriefing System 🏖
```
   __  ____                        ____                     _      __ __  
  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \ 
 / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _` | '__/ _` |   / /   \ \
 \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / /
  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/ 

```
# Backend:

Navigate to the server folder: 
> `$cd ./server`

Create a local `.env` file [based on `.env.template` file]

Install all dependencies & Run Node.js server:
> `$npm install && npm start`

Server runs on http://localhost:3001
Check its status on http://localhost:3001/api/health<br>
Response Example:
```json
{
  "service": "DroneGuard",
  "timestamp": "23/03/2022, 12:41:02",
  "status": "Ok",
  "database": {
    "name": "DroneGuard-DB",
    "status": "Ok"
  }
}
```

## Tests and Lint
### Run tests:
> `$npm run test:unit`

### Validate code style with eslint:
> `$npm run lint:validate`

# Frontend:

Navigate to the client folder:
> `$cd ../client/droneguard-debriefing`

Install all dependencies & Run the app in development mode:
> `$npm install && npm start`

App is live!<br/> 
Open http://localhost:3000 to view it in the browser.<br />
The page will reload if you make edits.<br />
You will also see any lint errors in the console.