<div align="center">

# ⚛️ React_JS_Starter

**A comprehensive, hands-on engineering playground for mastering modern React, TypeScript, and scalable frontend architecture.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

</div>

---

## 📖 Overview

Welcome to **React_JS_Starter**. This repository is not just a collection of code—it is a structured, progressive learning path. It documents a deep dive into React 19 and TypeScript, moving from core DOM manipulation and state management to complex, context-driven applications. Every folder represents a specific milestone in mastering the modern React ecosystem.

## 🗺️ Repository Architecture

The repo is modularized into distinct phases of learning. Navigate to specific folders to explore isolated Vite setups.

### 🧱 01. Core Fundamentals
*Strictly focused on building foundational React logic.*
*   **`01_Lists_nd_Basics`**: Component rendering, mapping arrays, and conditional rendering.
*   **`02_State_Management`**: Deep dive into `useState`, rebuilding base checkpoints to master state flow.
*   **`03_Events_nd_Effects`**: Handling side effects, synthetic events, and `localStorage` persistence (Includes the `FocusTimer`).

### 🌐 02. Data & API Sandboxes
*Connecting React to the outside world.*
*   **`dummyAPI-practice`**: Fetching data, handling robust loading/error states.
*   **`user_api_cp4`**: Structural setup for API-driven checkpoints.
*   **`React-TSX` / `hooks_combined`**: Integrating strict TypeScript typing with complex combined hooks.

### 🚀 03. Capstone Mini-Projects
*Combining all concepts into fully functional applications.*
*   **`mini-product-store`**: E-commerce simulation utilizing global `ShopContext` for managing favorites, filtering, and cart logic (`useContext` + `useMemo`).
*   **`smart-focus-timer`**: A feature-rich productivity timer with advanced theme switching and UI states.
*   **`react-auth-flow`**: A simulated authentication flow featuring complex form validation, custom inputs, and user state transitions.

## 🛠️ Technical Core

This repository demonstrates proficiency in the following advanced concepts:

| Category | Implementations |
| :--- | :--- |
| **Core Hooks** | `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback` |
| **Global State** | `createContext`, `useContext` (preventing prop drilling) |
| **TypeScript** | Strict interfaces for API responses, custom Generics for Contexts |
| **Data Fetching** | REST API integration (DummyJSON), Async/Await, Error Boundaries |
| **Performance** | Memoization, Reference stability, Component re-render optimization |

## 🚀 Getting Started

Because this repository houses multiple isolated Vite projects, you must navigate into a specific project folder to run it.

**1. Clone the repository**
```bash
git clone https://github.com/dvlpFDSkmr/React_JS_Starter.git
cd React_JS_Starter
2. Enter a project folder (e.g., the mini product store)

bash
cd mini-product-store
3. Install dependencies & Run

bash
npm install
npm run dev
