<h1 align='center'>DroneGuard</h1>
<p align='center'>
  <img width='300' src='https://github.com/idobetesh/DroneGuard/blob/master/assets/droneguard-logo.png' alt='DroneGuard Logo'>
</p>

[![Tests Status](https://github.com/idobetesh/DroneGuard/actions/workflows/run-tests.yml/badge.svg?event=push)](https://github.com/idobetesh/DroneGuard/actions)
---
<p align='center'>DroneGuard is a tool that lets lifeguards supervise the beaches with a drone in an intuitive way and without any prior knowledge of flying drones. The tool also records usage sequences thereby enabling a review and analysis of emergency events.</p>

```
   __  ____                        ____                     _      __ __  
  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \ 
 / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _` | '__/ _` |   / /   \ \
 \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / /
  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/ 

```

## High Level Project Tree
```
.
├── assets
├── control-server
│   ├── algorithm
│   ├── test
│   └── utils
├── debriefing-service
│   ├── client
│   │   ├── public
│   │   └── src
│   ├── lambdas
│   └── server
│       ├── api
│       ├── postman
│       └── test
├── droneguard-app
│   ├── public
│   └── src
│       ├── api
│       ├── app
│       ├── components
│       ├── config
│       ├── features
│       ├── pages
│       └── utils
├── hardware
│   ├── camera
│   │   ├── pycam
│   │   └── server
│   ├── compass
│   ├── gps
│   └── scripts
├── poc
│   ├── transformations
│   │   ├── node-version
│   │   └── python-version
│   └── views
├── raspberry-pi-config
│   └── add-to-boot-drive
└── tello-basics
    ├── basics-node
    │   └── utils
    ├── basics-python
    │   └── tello-captures
    └── tello-sdk-documentation
    
```
# Build and Run

## Prerequisites
- Node v16.13.2
- NPM 8.4.0
- Python 3.8
- Docker CLI *(optional)*
## There are two ways to build and run DroneGuard project locally
### 1. Service by Service
- Navigate to the DroneGuard directory and run `$make install`.
- Get all of the required project dependencies installed.</br>
- See internal README files to run the different services.
### 2. Using Docker
- Make sure to have Docker CLI installed on your machine.
- Navigate to the DroneGuard directory and run `$make build`.
- Five core DroneGuard services:
  - **DroneGuard Main Server** ([*`./debriefing-service/server`*](https://github.com/idobetesh/DroneGuard/tree/master/debriefing-service/server))
  - **DroneGuard DB** [[*mongoDB*](https://hub.docker.com/layers/mongo/library/mongo/4.0.16-xenial/images/sha256-1405a8f6e31677ff4b3294194dcd06e146dc0bad2a630eb284788e94231127a5?context=explore)]
  - **DroneGuard Control Server** ([*`./control-server`*](https://github.com/idobetesh/DroneGuard/tree/master/control-server))
  - **DroneGuard Main App** ([*`./droneguard-app`*](https://github.com/idobetesh/DroneGuard/tree/master/droneguard-app))
  - **DroneGuard Debriefing App** ([*`./debriefing-service/client`*](https://github.com/idobetesh/DroneGuard/tree/master/debriefing-service/client))
- Get all of the required project images built [from the internal Docker files].</br>
- Run `$make start` in order to start the containers and run the project.
- When finish run `$make stop` to stop the project and remove its containers.
- If needed, run `$make clear` to remove both volumes and images.

# Test and Lint
*See compatible internal services*
### Run tests:
> `$npm run test:unit`

> `$npm run test:integration`

### Validate code style with eslint:
> `$npm run lint:validate`
