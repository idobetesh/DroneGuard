import React from "react";
import ReactHlsPlayer from "react-hls-player";

const Video = () => {

  return (
    <>
      <ReactHlsPlayer
        src="http://localhost:4000/index.m3u8"
        autoPlay={true}
        // controls={true}
        width="648px"
        height="486px"
        hlsConfig={{
          lowLatencyMode: true,
        }}
        className="vid"
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
