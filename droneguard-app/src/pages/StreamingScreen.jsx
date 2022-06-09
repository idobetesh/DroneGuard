import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sleep } from "../utils/utils";

import socket from "../utils/socket";
import Video from "../components/Video";
import { Navigation } from "../components/Navigation";
import { colors } from "@material-ui/core";
import SelectInput from "@material-ui/core/Select/SelectInput";

const useDroneState = () => {
  const [droneState, updateDroneState] = useState({});
  useEffect(() => {
    socket.on("dronestate", updateDroneState);
    return () => socket.removeListener("dronestate");
  }, []);

  return droneState;
};

const StreamingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [FormHasError, setFormHasError] = useState(false);
  const [cursorStyle, setCursorStyle] = useState({
    position: "absolute",
    width: "0px",
    height: "0px",
  });

  const handleClickEvent = async (e) => {
    setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    const cursorStyle = {
      position: "absolute",
      left: e.nativeEvent.offsetX - 10,
      top: e.nativeEvent.offsetY - 10,
      backgroundColor: "Red",
      width: "20px",
      height: "20px",
      borderRadius: "10px",
      opacity: "60%",
    };
    setCursorStyle(cursorStyle);
    await sleep(2000);
    setCursorStyle({ position: "absolute", width: "0px", height: "0px" });

    if (FormHasError) return;
  };

  useEffect(() => {
    const hasErrors = Object.keys(position).filter(
      (key) => position[key].error
    );
    if (!hasErrors.length) {
      setFormHasError(() => true);
    }
    console.log(`position`, position);
  }, [position]);

  const droneState = useDroneState([]);
  return (
    <>
      <div className="content">
        <h1> Drone Navigation </h1>
        <div
          className="container"
          onClick={(e) => {
            handleClickEvent(e);
          }}
        >
          <div>
            <div className="drone_info">
              <div className="cursor" style={cursorStyle}></div>
              <h3 style={{position: 'relative', width: '75px'}}>Battery: {droneState.bat}%</h3>
              <h3 style={{position: 'relative', width: '75px'}}>YAW: {droneState.yaw}</h3>
              <h3 style={{position: 'relative', width: '80px'}}>height: {droneState.h} cm</h3>
            </div>
          </div>
          <Video />
        </div>
      </div>
      <Navigation coordinate={position} />
    </>
  );
};

export default StreamingScreen;
