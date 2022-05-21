import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import socket from "../utils/socket";

const sendCommand = (command) => {
  return () => {
    console.log(`Sending the command ${command}`);
    socket.emit("command", command);
  };
};

// We want the calculations & transformation algorithms will take place
// at the control-server, for that we'll send it coordinate & drone height
// as an object: {coordinate, height: h}
const sendPressData = (pressData) => {
  return () => {
    console.log(`Sending pressData ${JSON.stringify(pressData)}`);
    socket.emit("pressData", pressData);
  };
};

const sendTakeOff = (takeoff) => {
  return () => {
    console.log(`Sending the command ${takeoff}`);
    socket.emit("takeoff");
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

const Navigation = ({ coordinate, pressed }) => {
  const status = useSocket();
  const droneState = useDroneState([]);
  const DEFAULT_DISTANCE = 200; //cm
  

  return (
    <>
      <h3>Manual Navigation - Status is {status}</h3>
      <div className="controls">
        <div className="circle">
          <button
            disabled={pressed}
            className="forward-btn"
            onClick={sendCommand(`forward ${DEFAULT_DISTANCE}`)}
          >
            <span>↑</span>
          </button>
          <div className="center-btns">
            <button
              disabled={pressed}
              className="left-btn"
              onClick={sendCommand(`left ${DEFAULT_DISTANCE}`)}
            >
              <span className="">←</span>
            </button>
            <button
              disabled={pressed}
              className="right-btn"
              onClick={sendCommand(`right ${DEFAULT_DISTANCE}`)}
            >
              <span className="">→</span>
            </button>
          </div>
          <button
            disabled={pressed}
            className="back-btn"
            onClick={sendCommand(`back ${DEFAULT_DISTANCE}`)}
          >
            <span className="">↓</span>
          </button>
        </div>
        <div className="takeoff-land">
          <Button
            disabled={pressed}
            variant="contained"
            color="primary"
            style={{
              marginRight: "5px",
              backgroundColor: "#488E7B",
              border: "#488E7B",
            }}
            onClick={sendCommand("up 150")}
          >
            <span className="symbol">👍🏼</span>
          </Button>
          <Button
            disabled={pressed}
            variant="contained"
            color="primary"
            style={{
              marginRight: "5px",
              backgroundColor: "#488E7B",
              border: "#488E7B",
            }}
            onClick={sendCommand(`down ${DEFAULT_DISTANCE}`)}
          >
            <span className="symbol">👎🏼</span>
          </Button>
        </div>
        <div className="takeoff-land">
          <Button
            disabled={pressed}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#488E7B", border: "#488E7B" }}
            onClick={sendPressData({ coordinate, height: droneState.h })}
          >
            <span className="symbol">Move</span>
          </Button>
          <Button
            disabled={pressed}
            style={{ backgroundColor: "red", color: "white" }}
            variant="contained"
            onClick={sendCommand("emergency")}
          >
            <span className="symbol">Emergency!</span>
          </Button>
        </div>
        <div className="takeoff-land">
          <Button
            disabled={pressed}
            variant="contained"
            color="primary"
            style={{
              marginRight: "5px",
              backgroundColor: "#488E7B",
              border: "#488E7B",
            }}
            onClick={sendCommand("takeoff")}
          >
            <span className="symbol">TAKEOFF</span>
          </Button>
          <Button
            disabled={pressed}
            variant="contained"
            color="primary"
            style={{
              marginRight: "5px",
              backgroundColor: "#488E7B",
              border: "#488E7B",
            }}
            onClick={sendCommand("land")}
          >
            <span className="symbol">LAND</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export { Navigation, useDroneState, sendPressData };