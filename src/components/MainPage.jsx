import React from "react";
import AllUsers from "./AllUsers";
import { Outlet, useLocation } from "react-router-dom";

function MainPage() {
  const location = useLocation();

  // Check if the current view is mobile
  const isMobile = window.innerWidth < 768;

  return (
    <>
      {isMobile ? (
        // On mobile, show either AllUsers or Outlet based on the route
        location.pathname === "/" ? (
          <div className="min-h-screen w-full bg-[#343353]">
            <AllUsers />
          </div>
        ) : (
          <div className="min-h-screen w-full bg-gray-300">
            <Outlet />
          </div>
        )
      ) : (
        // On desktop, show side-by-side layout
        <div className="flex min-h-screen w-full">
          <div className="bg-[#343353] h-screen w-1/2">
            <AllUsers />
          </div>
          <div className="w-full h-screen bg-gray-300">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
