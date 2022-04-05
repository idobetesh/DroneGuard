# Control Server
```
   __  ____                        ____                     _      __ __  
  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \ 
 / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _` | '__/ _` |   / /   \ \
 \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / /
  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/ 

```

Install all dependencies & Run control server:
> `$npm install && npm start`

Server runs on http://localhost:3002

## Navigation Features
### Lifeguard can choose between two navigation options:
### 1. Regular single navigation command
Click on one of the four arrows in the UI.</br>
In this case, the command will be sent in the following format:

```js
{ direction: 'right', distance: 235 }
```

### 2. Bulk commands
Press on a specific area on the streaming screen, our algorithms will calculate the required commands in order the get the drone to that specific point.</br>
In this case, the commands will be sent in bulk in the following format:

```js
[
  { direction: 'right', distance: 235 },
  { direction: 'forward', distance: 123 },
  { direction: 'down', distance: 200 },
  { direction: 'up', distance: 200 }
]
```
---
## Tests
Run tests:
> `$npm test`