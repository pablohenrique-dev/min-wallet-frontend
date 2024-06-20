import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "@/pages/register";
import { LoginPage } from "@/pages/login";

const myRoutes = [
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
