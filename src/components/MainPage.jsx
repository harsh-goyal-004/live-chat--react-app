import React from "react";
import AllUsers from "./AllUsers";
import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <>
      <div className="flex min-h-screen w-full">
        <div className=" bg-[#343353] h-screen w-1/2 ">
          <AllUsers />
        </div>
        <div className="w-full h-screen bg-gray-300 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainPage;
