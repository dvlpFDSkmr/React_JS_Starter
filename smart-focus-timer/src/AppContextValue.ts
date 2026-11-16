import React,{ createContext } from "react";

export type Task = {
  id: number;
  taskText: string;
  isCompleted: boolean;
};

export type Theme = "light" | "dark";

export type AppContextType = {
  theme: Theme;
  tasks: Task[];
  addTask: (taskText: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  toggleTheme: () => void;
};
export type AppProviderProps = { children: React.ReactNode };
// createcontext function should be outside
export const ThemeContext = createContext<AppContextType | null>(null);
