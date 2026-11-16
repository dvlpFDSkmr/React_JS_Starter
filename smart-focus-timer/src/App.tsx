import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import { ThemeContext } from "./AppContextValue";
import "./App.css";
import { Timer } from "./components/Timer";

function App() {
  const serachInputRef = useRef<HTMLInputElement>(null);
  const ctx = useContext(ThemeContext);
  const [input, setInput] = useState<string>("");
  const [sessions, setSessions] = useState<number>(0);

  useEffect(() => {
    serachInputRef.current?.focus();
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.currentTarget.value);
  }

  function handleButton() {
    if (input.trim()) {
      ctx?.addTask(input.trim());
    }
    setInput("");
  }
  console.log(ctx?.tasks);

  const handleStop = useCallback(() => {
    setSessions((s) => s + 1);
  }, []);

  return (
    <div>
      <h1>Sessions : {sessions}</h1>
      <button onClick={ctx?.toggleTheme}>Change Theme</button>
      <Timer onStop={handleStop} />

      <div className="appContainer">
        <input type="text" value={input} onChange={handleInputChange} ref={serachInputRef} />
        <button onClick={handleButton}>Add item</button>
        {ctx?.tasks.map((task) => (
          <div className="taskItem" key={task.id}>
            <p>{task.taskText}</p>
            <input type="checkbox" checked={task.isCompleted} onChange={() => ctx?.toggleTask(task.id)} />
            <button onClick={() => ctx?.deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
