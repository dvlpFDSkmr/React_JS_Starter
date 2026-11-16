import React, { useEffect, useRef, useState, useMemo } from "react";

type TimerProps = {
  onStop: () => void;
};

export const Timer = React.memo(({ onStop }: TimerProps) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const formatted = useMemo(() => formatTime(seconds), [seconds]);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    // String(min) :: convert min number into string
    // padstart : string method, takes string too short and stuffs character untill its right length. here stuffs 2 0s
    const mm = String(mins).padStart(2, "0");
    const ss = String(secs).padStart(2, "0");

    return `${mm}:${ss}`;
  }

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
      <h1>{formatted}</h1>
      <button onClick={handleTimer}>{running ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
});
