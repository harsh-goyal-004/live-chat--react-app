import React from "react";

function Button({ children, type = "button", className = "", ...props }) {
  return (
    <>
      <button
        type={type}
        className={` border-2 py-2 px-10 text-xl font-semibold rounded-lg m-2 ${className}`}
        {...props}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
