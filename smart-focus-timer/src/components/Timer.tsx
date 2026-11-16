import { useEffect, useState } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [running, setRunning] = useState(false);

  function handleTimer() {
    setRunning((prev) => !prev);
  }

  function handleReset() {
    setSeconds(0);
    setRunning(false);
  }

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [running]);
  return (
    <div className="timer">
      <h1>{seconds} seconds</h1>
      <button onClick={handleTimer}>{running ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
