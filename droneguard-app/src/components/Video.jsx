import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const Video = () => {
  return (
    <>
      {/* <h1>IP Camera Streaming</h1> */}
      <ReactPlayer url="http://192.168.0.102:4000/index.m3u8" playing={true} />
    </>
  );
};

export default Video;
