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

### Bulk command format
```js
[
  { direction: 'right', distance: 235 },
  { direction: 'forward', distance: 123 },
  { direction: 'down', distance: 200 },
  { direction: 'up' , distance: 200 }
]
```
---
## Tests
Run tests:
> `$npm test`