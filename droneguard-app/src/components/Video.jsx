import React from 'react';
import ReactPlayer from 'react-player';
import ReactHlsPlayer from 'react-hls-player';

const Video = () => {
  return (
    <>
      <div style={{ background: 'red' }}>
      </div>
    </>
  );
};

// ReactHlsPlayer try
// const Video = () => {
//   return (
//     <>
//       <ReactHlsPlayer
//         src="http://localhost:4000/index.m3u8"
//         autoPlay={true}
//         controls={true} 
//         width='640px'
//         height='480px'
//         hlsConfig={{
//           lowLatencyMode: true,
//         }}  
//       />
//     </>
//   );
// };

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
