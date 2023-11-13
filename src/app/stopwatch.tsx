import React, { useState, useEffect } from 'react';
import './stopwatch_style.css';


interface StopwatchProps {
  resetButtonClick: () => void;
  startButtonClick: () => void;
}

const Stopwatch = ({ resetButtonClick, startButtonClick }: StopwatchProps): JSX.Element => {
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [counting, setCounting] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | undefined>(undefined);

  const [buttonColor, setButtonColor] = useState('green');


  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (counting) {
      intervalId = setInterval(updateTimer, 10);
      setTimerInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [counting]);

  const handleReset = () => { // function of reset button
    resetButtonClick();

    setCounting(false);
    clearInterval(timerInterval!);
    setSeconds(0);
    setMilliseconds(0);
    setElapsedTime(0);
  };

  const handleStart = () => {
    startButtonClick();
    if (!counting) { //fuunction that press to count
      setCounting(true);
      setStartTime(Date.now() - elapsedTime);
      setButtonColor('blue'); // change the color of start button to blue to imply the stopwatch runs
    } else { // function that press to pause
      setCounting(false);
      clearInterval(timerInterval!); // clear all timeInterval to reverse
      setButtonColor('green'); // change the color of start button to blue to imply the stopwatch pause
    }
  };

  const updateTimer = () => {
    const currentTime = Date.now();
    const updatedElapsedTime = currentTime - startTime;
    const newSeconds = Math.floor(updatedElapsedTime / 1000);
    const newMilliseconds = Math.floor(updatedElapsedTime % 100);
    setSeconds(newSeconds);
    setMilliseconds(newMilliseconds);
    setElapsedTime(updatedElapsedTime); //record the ElapsedTime every time it runs since the current time is passing
  };

  // ensure the display of second and millisecond be at least 2 digit
  const padZeroes = (num: number, length: number) => {
    let padded = num.toString();
    while (padded.length < length) {
      padded = '0' + padded;
    }
    return padded;
  };

  return (
    <div>
      <div id='heading'>
        <p>Stopwatch</p>
      </div>
      <div id='container'>
        <div id='time' className='white-text'>
          <span id='sec'>{padZeroes(seconds, 2)}s</span>
          <span id='millisec'>{padZeroes(milliseconds, 2)}</span>
        </div>
        <div id='buttons' className='white-text'>
          <button
            style={{ backgroundColor: buttonColor }}
            id='start'
            onClick={() => {handleStart()}}
          >
            Start
          </button>
          <button
            id='reset'
            onClick={handleReset}
            disabled={counting}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;