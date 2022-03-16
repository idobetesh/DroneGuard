import React from "react";
import ReactPlayer from "react-player";

const Video = () => {
  return (
    <>
      <ReactPlayer
        // this resolution is 1:3 from the real resolution (2592x1944). when the user will click on the screen
        // we will multiple the (x,y) values by 3.
        width="864px"
        height="648px"
        // width="120%"
        // height="100%"
        controls={false}
        url="http://10.100.102.52:4000/index.m3u8"
        playing={true}
      />
    </>
  );
};

export default Video;
