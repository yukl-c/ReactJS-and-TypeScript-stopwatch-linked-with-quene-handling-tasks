// testing.tsx
import react, { useState } from "react";
 
//const [clicking, setClicking] = useState(false);

/*export function startButtonClick() {
  //(clicking === false) ? setClicking(true) : setClicking(false);
  console.log(1);
}*/

/* export const startButtonClick = () => {
  const clicking = false;
  console.log(clicking);
}; */

export const StartButton = () => {
  const [clicking, setClicking] = useState(false);

  const startButtonClick = () => {
    if (clicking === false) {
      setClicking(true);
    } else {
      setClicking(false);
    }
    console.log(clicking);
  };

  return {
    startButtonClick
  };
};