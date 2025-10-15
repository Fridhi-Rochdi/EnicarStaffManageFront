import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ADDTICKET, HOME, LOGIN, EXAM_PERIODS, ROOM_RESERVATIONS, USER_MANAGEMENT, DASHBOARD, PROFILE, LANDING, TICKET } from "./routes";
import Login from "./pages/login";
import PrimaryLayout from "./layout/primaryLayout";
import Landing from "./pages/landingPage";
import PublicLandingPage from "./pages/publicLandingPage";
import AddTicketPage from "./pages/addTicketPage";
import ExamPeriodsPage from "./pages/examPeriodsPage";
import RoomReservationsPage from "./pages/roomReservationsPage";
import UsersManagementPage from "./pages/usersManagementPage";
import DashboardPage from "./pages/dashboardPage";
import ProfilePage from "./pages/profilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import RootLayout from "./layout/RootLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <PublicLandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <PrimaryLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "ticket",
        element: <Landing />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "ticket/add",
        element: <AddTicketPage />,
      },
      {
        path: "exam-periods",
        element: (
          <RoleProtectedRoute allowedRoles={["ADMIN"]}>
            <ExamPeriodsPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "room-reservations",
        element: <RoomReservationsPage />,
      },
      {
        path: "users",
        element: (
          <RoleProtectedRoute allowedRoles={["ADMIN"]}>
            <UsersManagementPage />
          </RoleProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

