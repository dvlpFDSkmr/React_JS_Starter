import { useState, useCallback } from "react";
import type { Task, Theme, AppProviderProps } from "./AppContextValue";
import { ThemeContext } from "./AppContextValue";

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((taskText: string): void => {
    setTasks((prev) => [...prev, { id: Date.now(), taskText: taskText, isCompleted: false }]);
  }, []);

  const deleteTask = useCallback((id: number): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // replacing old array with new array with changed task
  const toggleTask = useCallback((id: number): void => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  }, []);

  const toggleTheme = useCallback((): void => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }, [theme]);

  // value is just a plain JavaScript object.
  return (
    <ThemeContext.Provider value={{ theme, tasks, addTask, deleteTask, toggleTask, toggleTheme }}>
      {/* {children} is just whatever you wrapped inside <AppProvider></AppProvider> */}
      {children}
    </ThemeContext.Provider>
  );
}
