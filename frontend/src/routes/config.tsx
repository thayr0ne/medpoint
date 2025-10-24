import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { PublicLayout } from "@/components/layout/public-layout";
import { AppLayout } from "@/components/layout/app-layout";

const DashboardPage = lazy(() => import("@/pages/dashboard"));
const PrescriptionPage = lazy(() => import("@/pages/prescription"));
const PatientsPage = lazy(() => import("@/pages/patients"));
const ModelsPage = lazy(() => import("@/pages/prescription-models"));
const LoginPage = lazy(() => import("@/pages/login"));

export const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "prescricoes", element: <PrescriptionPage /> },
      { path: "pacientes", element: <PatientsPage /> },
      { path: "modelos", element: <ModelsPage /> }
    ]
  },
  {
    path: "/auth",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <LoginPage /> }
    ]
  },
  { path: "*", element: <Navigate to="/" replace /> }
];
