import React, { useEffect } from "react";
// import { useQuery } from "react-query";
import { getLoginCheck } from "../../Hooks/User";
import { Alert } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkLogin() {
      const response = await getLoginCheck();
      console.log(response.data);

      if (response.data === "Session found") {
        navigate("/dashboard");
        // console.log(Cookies.get("name"));
        // const name = Cookies.get("name");
        // setCurrentUser(name);
      }
      if (response.data === "Session not found") {
        // setCurrentUser(null);
        navigate("/register");
      }
    }

    checkLogin();
  }, []);
  // const { currentUser } = useAuth;
  // console.log(currentUser);
  // return currentUser ? children : <Navigate to="/login" />;
  return children;
}
