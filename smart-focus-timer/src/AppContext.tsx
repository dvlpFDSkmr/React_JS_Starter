import { useState } from "react";
import type { Task, Theme, AppProviderProps } from './AppContextValue';
import { ThemeContext } from './AppContextValue';

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(taskText: string): void {
    setTasks((prev) => [...prev, { id: Date.now(), taskText: taskText, isCompleted: false }]);
  }

  function deleteTask(id: number): void {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  // replacing old array with new array with changed task
  function toggleTask(id: number): void {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  }

  function toggleTheme(): void {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  // value is just a plain JavaScript object.
  return (
    <ThemeContext.Provider value={{ theme, tasks, addTask, deleteTask, toggleTask, toggleTheme }}>
     {/* {children} is just whatever you wrapped inside <AppProvider></AppProvider> */}
      {children}
    </ThemeContext.Provider>
  );
}
