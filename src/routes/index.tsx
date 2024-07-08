import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "@/pages/register";
import { LoginPage } from "@/pages/login";
import { HomePage } from "@/pages/home/home";
import { ProtectedRoute } from "@/utils/protected-route";
import { ForgotPasswordPage } from "@/pages/forgot-password";
import { ResetPasswordPage } from "@/pages/reset-password";

const myRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
];

export function AppRoutes() {
  return (
    <Routes>
      {myRoutes.map(({ element, path }) => {
        return <Route path={path} element={element} key={path}></Route>;
      })}
    </Routes>
  );
}
