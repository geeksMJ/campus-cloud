import { Outlet } from "react-router-dom";
import { useState } from "react";

import SideBar from "./SideBar";
import Navbar from "../../Common/Ui/Navbar";
import DownBar from "./DownBar";

export default function EmployeeAppLayout() {
  const [sideBar, setSideBar] = useState(true);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar setSideBar={setSideBar} />

      <div className="flex flex-1 overflow-hidden">
        {sideBar && (
          <div className="hidden  md:flex  md:w-3/12 h-full overflow-y-auto">
            <SideBar setSideBar={setSideBar} />
          </div>
        )}
        <div className={`flex-1 overflow-y-auto bg-secondary`}>
          <Outlet />
        </div>
      </div>

      <div className="md:hidden">
        <DownBar />
      </div>
    </div>
  );
}
