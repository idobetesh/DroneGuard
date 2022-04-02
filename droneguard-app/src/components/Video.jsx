import React from "react";
import ReactHlsPlayer from "react-hls-player";
import { sendPressData, useDroneState } from "./Navigation";
import socket from "../utils/socket";

const Video = ({ coordinate }) => {
  const droneState = useDroneState();

  const pressCords = (coordinate) => {
    console.log(`Sending pressData ${JSON.stringify(coordinate)}`);
    socket.emit("pressData", coordinate);
  };

  return (
    <>
      <ReactHlsPlayer
        src="http://localhost:4000/index.m3u8"
        autoPlay={true}
        // controls={true}
        width="640px"
        height="480px"
        hlsConfig={{
          lowLatencyMode: true,
        }}
        className="vid"
        onClick={pressCords({ coordinate, height: droneState.h })}
      />
    </>
  );
};

// iframe try
// const Video = () => {
//   return (
//     <iframe
//       src='http://169.254.27.220:8002/index.html'
//       height={460}
//       width={680}
//       frameBorder={'none'}
//       scrolling={false}>
//     </iframe>
//   );
// };

export default Video;
