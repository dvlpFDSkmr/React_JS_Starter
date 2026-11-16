import React, { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "./AppContextValue";
import "./App.css";
import { Timer } from "./components/Timer";

function App() {
  const serachInputRef  = useRef<HTMLInputElement>(null);
  const ctx = useContext(ThemeContext);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    serachInputRef .current?.focus();
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

  return (
    <div>
      <button onClick={ctx?.toggleTheme}>Change Theme</button>
      <Timer/>
      <div className="appContainer">
        <input type="text" value={input} onChange={handleInputChange} ref={serachInputRef } />
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
