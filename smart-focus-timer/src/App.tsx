import { useContext } from "react";
import { ThemeContext } from "./AppContextValue";

function App() {
  const ctx = useContext(ThemeContext);
  return (
    <div className="appConrainer">
      <button onClick={() => ctx?.toggleTheme()}>Toggle Theme</button>
    </div>
  );
}

export default App;
