import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import socket from "../utils/socket";

import droneMovement from "../algorithm/algo.js";
import xMovement from "../algorithm/algo.js";
import yMovement from "../algorithm/algo.js";
const curr = { lat: 32.093128, lon: 34.787805 };
const xy = { x: 2700, y: 340 };
const dest = { lat: 32.093194898476746, lon: 34.78780385430309 };

const commandDelays = {
  command: 500,
  takeoff: 5000,
  land: 5000,
  up: 7000,
  down: 7000,
  left: 5000,
  go: 7000,
  right: 5000,
  forward: 5000,
  back: 5000,
  cw: 5000,
  ccw: 5000,
  flip: 3000,
  speed: 3000,
  "battery?": 500,
  "speed?": 500,
  "time?": 500,
};

const sleep = async (ms) => {
  console.log(`sleep for ${ms / 1000} seconds`);
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const sendCommand = (command) => {
  return () => {
    console.log(`Sending the command ${command}`);
    socket.emit("command", command);
  };
};

const sendSpecial = (commands) => {
  return () => {
    console.log(`Sending the commands ${commands}`);
    socket.emit("special", commands);
  };
};

const useSocket = () => {
  const [status, updateStatus] = useState("DISCONNECTED");
  useEffect(() => {
    socket.on("status", updateStatus);
    return () => socket.removeListener("status");
  }, []);
  return status;
};

const useDroneState = () => {
  const [droneState, updateDroneState] = useState({});
  useEffect(() => {
    socket.on("dronestate", updateDroneState);
    return () => socket.removeListener("dronestate");
  }, []);

  return droneState;
};

const Navigation = () => {
  const status = useSocket();
  const droneState = useDroneState([]);

  return (
    <>
      <h3>Manual Navigation - Status is {status}</h3>
      {/* <h3>Battery: {droneState.bat}%</h3>
      <h3>YAW: {droneState.yaw}</h3>
      <h3>height: {droneState.h} cm</h3> */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("up 100")}
      >
        <span className="symbol">👍🏼</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("down 30")}
      >
        <span className="symbol">👎🏼</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("back 30")}
      >
        <span className="symbol">↓</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("forward 30")}
      >
        <span className="symbol">↑</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("left 30")}
      >
        <span className="symbol">←</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("right 30")}
      >
        <span className="symbol">→</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("land")}
      >
        <span className="symbol">LAND</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("takeoff")}
      >
        <span className="symbol">TAKEOFF</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("cw 90")}
      >
        <span className="symbol">⟳</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("ccw 90")}
      >
        <span className="symbol">⟲</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginUp: "15px" }}
        onClick={sendCommand("emergency")}
      >
        <span className="symbol">Emergency!</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginUp: "15px" }}
        onClick={
          // handleMoves
          // console.log("hello")
          sendSpecial(droneMovement(xy, droneState.h))
          // sendCommand("forward 30px")
          // handleMoves(droneMovement(xy, droneState.h))
        }
      >
        <span className="symbol">Test!</span>
      </Button>

      {/* TEST */}
      {/* <Button
        variant="contained"
        color="primary"
        style={{ marginUp: "15px" }}
        // curr_height, yaw, curr_coordinate, press_xy
        onClick={sendCommand("cw 90")}
        // handleMoves()
        // (sendCommand(droneMovement(xy, droneState.h)[0]),
        // sendCommand(xMovement(xy, droneState.h))
        // }
        // getDistanc{eFromLatLonInKm(curr, dest, droneState.h)
      >
        <span className="symbol">Test!</span>
      </Button> */}
    </>
  );
};

export { Navigation, useDroneState, sendSpecial };
