import React, { useEffect, useRef, useState } from "react";

export function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.currentTarget.value);
  }

  function handleClear() {
    setInput("");
    inputRef.current?.focus();
  }

  function handleSelect() {
    inputRef.current?.select();
  }

  return (
    <div className="FocusInput">
      <h1>Focus Input</h1>
      <input type="text" name="serachBar" value={input} id="" ref={inputRef} onChange={handleChange} />
      <button>Serach</button>
      <button onClick={handleClear}>Clear Input</button>
      <button onClick={handleSelect}>Slect All</button>
      <p>{input}</p>
    </div>
  );
}
