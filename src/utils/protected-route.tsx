import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/auth";

export function ProtectedRoute({ children }: React.PropsWithChildren) {
  const token = localStorage.getItem("token");
  const { isUserLogged } = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (isUserLogged === null) return null;
  return isUserLogged ? children : <Navigate to="/login" />;
}
