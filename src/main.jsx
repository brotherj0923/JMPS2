import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ResultPage from './pages/Result.jsx';
import SlotMachine from "./components/SlotMachine";
import ResultIntro from './pages/ResultIntro';
import ResultDetail from './pages/ResultDetail';
import TestFigmaPage from './pages/TestFigmaPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // ✅ 모든 페이지를 감싸는 레이아웃
    children: [
      {
        index: true, // == path: "/"
        element: <SlotMachine />,
      },
      {
        path: "result/:id",
        element: <ResultIntro />, // ✅ 소개 페이지
      },
      {
        path: "test",
        element: <TestFigmaPage />,
      },
      {
        path: "result/:id/detail",
        element: <ResultDetail />, // ✅ 코스 상세 페이지
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);