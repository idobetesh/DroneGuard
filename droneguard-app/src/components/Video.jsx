import React from 'react';
import ReactPlayer from 'react-player';

const Video = () => {
  return (
    <>
      <ReactPlayer
        // this resolution is 1:3 from the real resolution (2592x1944). when the user will click on the screen
        // we will multiple the (x,y) values by 3.
        width='864px'
        height='648px'
        url='http://localhost:4000/index.m3u8'
        playing={true}
        controls={true}
        // config={{ file: { forceHLS: true } }}
      />
    </>
  );
};

export default Video;
