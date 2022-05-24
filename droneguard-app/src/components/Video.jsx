import React from 'react';
import ReactHlsPlayer from 'react-hls-player';

/* ReactHlsPlayer option */
// const Video = () => {
//   return (
//     <>
//       <ReactHlsPlayer
//         src='http://localhost:4000/index.m3u8'
//         autoPlay={true}
//         controls={true}
//         width='648px'
//         height='486px'
//         hlsConfig={{
//           lowLatencyMode: true,
//         }}
//         className='vid'
//       />
//     </>
//   );
// };

/* iframe option */
const Video = () => {
  return (
    <iframe
      src='http://192.168.10.4:8002/index.html'
      width={648}
      height={486}
      frameBorder={'none'}
      scrolling={false}
      >
    </iframe>
  );
};

export default Video;
