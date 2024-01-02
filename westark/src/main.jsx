import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/Root";
import Index from "./routes/Index";
import Login from "./routes/Login";
import Admin from "./routes/Admin";
import AddYear from "./routes/AddYear";

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        children: [
          { index: true, element: <Index /> },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "admin/year",
            element: <AddYear />,
          },
        ],
      },
    ],
  },
], { basename: '/westark' });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);