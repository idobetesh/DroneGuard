import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import socket from "../utils/socket";

import droneMovement from "../algorithm/algo.js";
const curr = { lat: 32.093128, lon: 34.787805 };
const xy = { x: 2700, y: 2340 };
const dest = { lat: 32.093194898476746, lon: 34.78780385430309 };

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const sendCommand = (command) => {
  return () => {
    console.log(`Sending the command ${command}`);
    socket.emit("command", command);
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

  const handleMoves = async () => {
    const moves = droneMovement(xy, droneState.h);
    console.log(`moves`, moves);
    sendCommand(moves[0]);
    await sleep(5000);
    sendCommand(moves[1]);
  };

  return (
    <>
      <h3>Manual Navigation - Status is {status}</h3>
      <h3>Battery: {droneState.bat}%</h3>
      <h3>YAW: {droneState.yaw}</h3>
      <h3>height: {droneState.h} cm</h3>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("up 200")}
      >
        <span className="symbol">↑</span>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "5px" }}
        onClick={sendCommand("down 30")}
      >
        <span className="symbol">↓</span>
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
        onClick={sendCommand("cw 15")}
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

      {/* TEST */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginUp: "15px" }}
        // curr_height, yaw, curr_coordinate, press_xy
        onClick={
          handleMoves
          // (sendCommand(droneMovement(xy, droneState.h)[0]),
          // sendCommand(droneMovement(xy, droneState.h)[1]))
        }
        // getDistanc{eFromLatLonInKm(curr, dest, droneState.h)
      >
        <span className="symbol">Test!</span>
      </Button>
    </>
  );
};

export default Navigation;
