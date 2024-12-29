import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const userStatus = useSelector((state) => state.auth.userStatus);

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (authentication && userStatus !== authentication) {
      navigate("/signup");
    } else if (authentication && userStatus === authentication) {
      navigate("/");
    }
  }, [authentication, userStatus, navigate]);

  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default Protected;
