/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBook } from "react-icons/fa";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

import SideBarItem from "../../Common/Ui/SideBarItem";
import { Logout } from "../../Common/service/auth";

export default function SideBar() {
  const [itemSelected, setItemSelected] = useState(
    localStorage.getItem("sidebar-selected") || "dashboard"
  );
  const [isRendered, setIsRendered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("sidebar-selected", itemSelected);
  }, [itemSelected]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const getItemStyle = (index) => ({
    opacity: isRendered ? 1 : 0,
    transform: isRendered
      ? "translateX(0) scale(1)"
      : "translateX(-500px) scale(1)",
    transition: "transform .5s",
    transitionDelay: isRendered ? `${index}s` : "0s", // Different delay for each item
  });

  return (
    <div
      className="bg-primary h-full w-full border-t-2 border-testColor1 pt-1 flex justify-center"
      style={{
        opacity: isRendered ? 1 : 0,
        transform: isRendered
          ? "translateX(0) scale(1)"
          : "translateX(-300px) scale(1)",
        transition: "transform .5s",
      }}
    >
      <div className="w-full">
        <div
          onClick={() => {
            setItemSelected("dashboard");
            // setSideBar(false);
          }}
          style={getItemStyle(0)}
        >
          <SideBarItem
            icon={<img src="/GreenHouse.png" className="w-11" />}
            title="Dashboard"
            link="employee/dashboard"
            itemSelected={itemSelected === "dashboard"}
          />
        </div>
        <div
          onClick={() => {
            setItemSelected("profile");
            // setSideBar(false);
          }}
          style={getItemStyle(0.2)}
        >
          <SideBarItem
            icon={<img src="/UserProfile.png" className="w-11" />}
            title="Profile"
            link="employee/profile"
            itemSelected={itemSelected === "profile"}
          />
        </div>
        <div
          onClick={() => {
            setItemSelected("courses");
            // setSideBar(false);
          }}
          style={getItemStyle(0.4)}
        >
          <SideBarItem
            icon={<img src="/Profile.png" className="w-10 mb-1" />}
            title="Courses"
            link="employee/courses"
            itemSelected={itemSelected === "courses"}
          />
        </div>
        <div
          onClick={() => {
            setItemSelected("settings");
            // setSideBar(false);
          }}
          style={getItemStyle(0.6)}
        >
          <SideBarItem
            icon={<img src="/Settings.png" className="w-10 mb-1" />}
            title="Settings"
            link="employee/settings"
            itemSelected={itemSelected === "settings"}
          />
        </div>

        <div
          onClick={() => {
            setItemSelected("quiz");
            // setSideBar(false);
          }}
          style={getItemStyle(0.8)}
        >
          <SideBarItem
            icon={<img src="/Quiz.png" className="w-14" />}
            title="Quizzes"
            link="employee/quiz"
            itemSelected={itemSelected === "quiz"}
          />
        </div>

        <div
          onClick={() => {
            Logout();
            navigate("/login");
          }}
          style={getItemStyle(1)}
        >
          <SideBarItem
            icon={<img src="/Exit.png" className="w-12" />}
            title="Logout"
          />
        </div>
      </div>
    </div>
  );
}
