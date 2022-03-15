import React, { Component } from "react";
import ReactDOM from "react-dom";

import { useEffect, useState } from "react";

export const useMousePosition = () => {
  let posX;
  let posY;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousedown", setFromEvent);
    return () => {
      window.removeEventListener("mousedown", setFromEvent);
    };
  }, []);
  posX = position.x;
  posY = position.y;
  if (posX > 331 && posX < 971) {
    if (posY > 187 && posY < 646) {
      posX -= 331;
      posY -= 187;

      const coords = {
        x: posX,
        y: posY,
      };
      console.log(`posX`, coords);
      return coords;
    }
  }

  return 0;
};
