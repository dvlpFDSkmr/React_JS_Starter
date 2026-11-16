import React, { useEffect, useRef, useState } from "react";

type TimerProps = {
  onStop: () => void;
};

export const Timer = React.memo(({ onStop }: TimerProps) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  console.log("Timer rendered");

  function handleTimer() {
    if (!running) {
      timerRef.current = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
    } else {
      if (timerRef.current !== null) {
        onStop();
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    setRunning((prev) => !prev);
  }

  useEffect(() => {
    // cleanup function
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  function handleReset() {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSeconds(0);
    setRunning(false);
  }

  return (
    <div className="timer">
      <h1>{seconds} seconds</h1>
      <button onClick={handleTimer}>{running ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
});
