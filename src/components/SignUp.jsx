import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../firebase/auth";
import Input from "./Input";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/UserSlice";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    try {
      setError("");
      const { uid, name, email, password } = data;
      const user = await authService.signUp(email, password, name);

      if (user) {
        dispatch(
          login({
            accessToken: user.accessToken,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log("Sign Up Error from Sign Up JSX : ", error);
      const errorMsg = error.message
        .replace("Firebase:", "")
        .replace("auth/", "");
      setError(errorMsg);
    }
  };

  return (
    <>
      <div className="flex w-full justify-center h-screen items-center">
        <div className=" px-10 py-4 border-2 rounded-lg shadow-xl ">
          <div className="flex flex-col mb-4 text-center">
            <span className="text-3xl font-semibold text-center w-full mb-8">
              Sign Up
            </span>
            <span className="text-red-500  w-80">{error}</span>
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            <Input
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              type="email"
              placeholder="Email ID"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="text-white bg-blue-700 w-80 uppercase tracking-wider border-none "
            >
              Submit
            </Button>

            <div className="mt-3 mb-2 text-center">
              Already have an Account? &nbsp;
              <button
                className="text-blue-700 font-semibold hover:underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
