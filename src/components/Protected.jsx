import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const userStatus = useSelector((state) => state.auth.userStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && userStatus !== true) {
      //If authentication is true and user is not logged in so go back to signup
      navigate("/signup");
    }
    if (!authentication && userStatus === true) {
      // if the user is logged in and try to access public page like login redirect to homepage
      navigate("/");
    }
  }, [authentication, userStatus, navigate]);

  // Fallback if the user is in the wrong state dont show anything
  if (authentication && userStatus !== true) {
    return null;
  }

  return <>{children}</>;
}

export default Protected;
