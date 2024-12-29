import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", placeholder, ...props },
  ref
) {
  const id = useId();

  return (
    <div>
      <div>
        {label && (
          <label className="w-full inline-block" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      <div>
        <input
          type={type}
          className={`w-80 border-2 m-2 p-2  rounded-lg placeholder:text-black mb-4 focus:placeholder:text-gray-300  ${className}`}
          id={id}
          {...props}
          ref={ref}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
});

export default Input;
