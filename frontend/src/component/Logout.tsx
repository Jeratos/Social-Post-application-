import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCont } from "../context/Context";

export default function Logout() {
  const { LogoutUser } = useCont();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return <Navigate to="/login" />;
}
