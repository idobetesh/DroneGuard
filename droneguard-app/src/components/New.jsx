import {useState,useEffect } from 'react'
const UseMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    // console.log(position)
    window.addEventListener("mousedown", setFromEvent);
    return () => {
        window.removeEventListener("mousedown", setFromEvent);
    };
  }, []);
  // if(position.x > 400 && position.x < 1040 && position.y > 152 && position.y < 612){
    // return position.x-400, position.y-152;
return position;
  // }
};
export default UseMousePosition;