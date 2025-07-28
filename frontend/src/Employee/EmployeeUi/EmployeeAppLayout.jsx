import { Outlet } from "react-router-dom";
import { useState } from "react";

import SideBar from "./SideBar";
import Navbar from "../../Common/Ui/Navbar";

export default function EmployeeAppLayout() {
  const [sideBar, setSideBar] = useState(true);

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <Navbar setSideBar={setSideBar} />
        <div className="flex h-full">
          {sideBar && (
            <div className="w-full h-full md:w-3/12 overflow-y-auto">
              <SideBar setSideBar={setSideBar} />
            </div>
          )}
          <div
            className={`${
              sideBar && "hidden md:flex"
            } w-full h-full overflow-y-auto`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
