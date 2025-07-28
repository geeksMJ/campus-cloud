/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SideBarItem from "../../Common/Ui/SideBarItem";

import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";

import { Logout } from "../../Common/service/auth";
import { useAllRequest } from "../components/requests/useAllRequests";
import Spinner from "../../Common/Ui/Spinner";

export default function AdminSideBar() {
  const { isLoading: loadingRequests, allRequest } = useAllRequest();
  const [itemSelected, setItemSelected] = useState("dashboard");
  const navigate = useNavigate();

  if (loadingRequests) return <Spinner />;

  return (
    <div className="bg-blue-700 h-full w-full border-t-2 pt-1 flex justify-center">
      <div className="w-full">
        <div
          onClick={() => {
            setItemSelected("dashboard");
            // setSideBar(false);
          }}
        >
          <SideBarItem
            icon={<FaHome className="my-2" />}
            title="Admin"
            link="admin/dashboard"
            itemSelected={itemSelected === "dashboard"}
          />
        </div>

        <div
          onClick={() => {
            setItemSelected("Tracking");
            // setSideBar(false);
          }}
        >
          <SideBarItem
            icon={<BsGraphUp className="my-2" />}
            title="Tracking"
            link="admin/tracking"
            itemSelected={itemSelected === "Tracking"}
          />
        </div>

        <div
          onClick={() => {
            setItemSelected("Courses");
            // setSideBar(false);
          }}
        >
          <SideBarItem
            icon={<FaBook className="my-2" />}
            title="Courses"
            link="admin/courses"
            itemSelected={itemSelected === "Courses"}
          />
        </div>

        <div
          onClick={() => {
            setItemSelected("Quizzes");
            // setSideBar(false);
          }}
        >
          <SideBarItem
            icon={<HiLightBulb className="my-2" />}
            title="Quizzes"
            link="admin/quizzes"
            itemSelected={itemSelected === "Quizzes"}
          />
        </div>

        <div
          onClick={() => {
            setItemSelected("Users");
            // setSideBar(false);
          }}
        >
          <SideBarItem
            icon={<FaUsers className="my-2" />}
            title="Users"
            link="admin/users"
            itemSelected={itemSelected === "Users"}
          />
        </div>

        <div
          onClick={() => {
            setItemSelected("Settings");
            // setSideBar(false);
          }}
        >
          <SideBarItem
            icon={<IoMdSettings className="my-2" />}
            title="Settings"
            link="admin/settings"
            itemSelected={itemSelected === "Settings"}
          />
        </div>
        <div
          onClick={() => {
            setItemSelected("Requests");
            // setSideBar(false);
          }}
        >
          <SideBarItem
            icon={<MdNotificationsActive className="my-2" />}
            title={`Requests`}
            request={allRequest?.length}
            link="admin/request"
            itemSelected={itemSelected === "Requests"}
          />
        </div>

        <div
          onClick={() => {
            Logout();
            navigate("/login");
          }}
        >
          <SideBarItem icon={<IoIosLogOut className="my-2" />} title="Logout" />
        </div>
      </div>
    </div>
  );
}
