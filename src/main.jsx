import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ADDTICKET, HOME, LOGIN } from "./routes";
import Login from "./pages/login";
import PrimaryLayout from "./layout/primaryLayout";
import Landing from "./pages/landingPage";
import AddTicketPage from "./pages/addTicketPage";

const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: HOME,
    element: <PrimaryLayout />,
    children : [
      {
        path: HOME,
        element: <Landing />,
      },
      {
        path: ADDTICKET,
        element: <AddTicketPage />,
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
