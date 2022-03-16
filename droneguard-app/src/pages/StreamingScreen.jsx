import React, { useState, useEffect } from "react";
import { Navigation, useDroneState } from "../components/Navigation";
import Video from "../components/Video";
import MousePosition from "./../components/MousePosition";

const StreamingScreen = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [FormHasError, setFormHasError] = useState(false);
  const handleClickEvent = (e) => {
    setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    if (FormHasError) {
      return;
    }
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

  return (
    <>
      <div className="content">
        <h1> Camera Streaming! </h1>
        URL : http://192.168.0.102:4000/index.m3u8
        <div
          className="containerr"
          onClick={(e) => {
            handleClickEvent(e);
          }}
        >
          <div>
            <div className="drone_info">
              <h3>Battery: {useDroneState.bat}%</h3>
              <h3>YAW: {useDroneState.yaw}</h3>
              <h3>height: {useDroneState.h} cm</h3>
            </div>
            <Video />
          </div>
        </div>
        {/* {position.x},{position.y} */}
        <Navigation />
      </div>
    </>
  );
};

export default StreamingScreen;
