<h1 align='center'>DroneGuard 🏖</h1>

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
- Docker CLI _(optional)_
## There are two ways to build and run DroneGuard project locally
### 1. Service by Service
- Navigate to the DroneGuard directory and run `$make install`.
- Get all of the required project dependencies installed.</br>
- See internal README files to run the different services.
### 2. Using Docker
- Make sure to have Docker CLI installed on your machine.
- Navigate to the DroneGuard directory and run `$make build`.
- Five core DroneGuard services:
  - DroneGuard Main Server _(`/DroneGuard/debriefing-service/server`)_
  - DroneGuard DB _[mongoDB]_
  - DroneGuard Control Server _(`/DroneGuard/control-server`)_
  - DroneGuard Main App _(`/DroneGuard/droneguard-app`)_
  - DroneGuard Debriefing App _(`/DroneGuard/debriefing-service/client`)_
- Get all of the required project images built [from the internal Docker files].</br>
- Run `$make start` in order to start the containers and run the project.
- When finish run `$make stop` to stop the project and remove its containers.
- If needed, run `$make clear` to remove both volumes and images.

# Test and Lint
_See compatible internal services_
### Run tests:
> `$npm run test:unit`</br>
> `$npm run test:integration`

### Validate code style with eslint:
> `$npm run lint:validate`