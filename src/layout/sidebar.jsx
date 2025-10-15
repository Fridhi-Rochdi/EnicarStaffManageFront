import { HomeIcon, PlusCircleIcon, XMarkIcon, CalendarIcon, BuildingOfficeIcon, UserGroupIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { ADDTICKET, HOME, LOGIN, EXAM_PERIODS, ROOM_RESERVATIONS, USER_MANAGEMENT, DASHBOARD, TICKET } from "../routes";
import { authAPI } from "../api/api";

export default function SideBar({ openaside, setOpenaside }) {
  const location = useLocation();
  const user = authAPI.getCurrentUser();

  const navigation = [
    {
      roles: ["ADMIN", "PROFESSOR", "STAFF"], // Accessible à tous
      icon: <ChartBarIcon className="size-6" />,
      label: <span className="font-semibold">Dashboard</span>,
      link: DASHBOARD,
    },
    {
      roles: ["ADMIN", "PROFESSOR", "STAFF"], // Accessible à tous
      icon: <HomeIcon className="size-6" />,
      label: <span className="font-semibold">Tickets</span>,
      link: TICKET,
    },
    {
      roles: ["ADMIN", "PROFESSOR", "STAFF"], // Accessible à tous
      icon: <PlusCircleIcon className="size-6" />,
      label: <span className="font-semibold">Add Ticket</span>,
      link: ADDTICKET,
    },
    {
      roles: ["ADMIN"], // Uniquement Admin
      icon: <CalendarIcon className="size-6" />,
      label: <span className="font-semibold">Exam Periods</span>,
      link: EXAM_PERIODS,
    },
    {
      roles: ["ADMIN", "STAFF"], // Admin et Personnel
      icon: <BuildingOfficeIcon className="size-6" />,
      label: <span className="font-semibold">Room Reservations</span>,
      link: ROOM_RESERVATIONS,
    },
    {
      roles: ["ADMIN"], // Uniquement Admin
      icon: <UserGroupIcon className="size-6" />,
      label: <span className="font-semibold">Users Management</span>,
      link: USER_MANAGEMENT,
    },
  ];

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter((item) => 
    user && item.roles.includes(user.role)
  );

  return (
    <React.Fragment>
      <aside
        className={`transition-transform duration-300 ${
          !openaside ? "-translate-x-full lg:translate-x-0 " : "translate-x-0"
        } fixed z-40 top-0 pb-3 px-6 flex flex-col justify-between h-screen border-r bg-white w-full lg:w-[25%]  2xl:w-[15%]`}
      >
        <button
          onClick={() => setOpenaside((prev) => !prev)}
          className="absolute top-1 right-1 p-2 m-1 border-2 rounded-xl lg:hidden"
        >
          <XMarkIcon className="size-7" />
        </button>
        <div className="overflow-auto overscroll-auto focus:overscroll-contain">
          <h1 className="text-center text-xl mt-5">
            <div className="flex flex-col items-center ">
              <span className="text-orange-500 text-2xl font-sans font-bold my-auto">
                ENI<span className="text-blue-400">CARTHAGE</span>
              </span>
              <div className="text-gray-500 text-xs relative -top-2 left-11">
                STAFF-Manage
              </div>
            </div>
          </h1>

          <ul className="space-y-2 tracking-wide mt-8">
            {filteredNavigation?.map(({ icon, label, link }, index) => {
              return (
                <li key={index}>
                  <Link
                    to={link}
                    className={`px-4 py-3 flex items-center gap-2 border-2 rounded-xl max-w-[500px] mx-auto ${
                      location.pathname === link
                        ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                        : "text-gray-600"
                    }`}
                  >
                    {icon}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <Link
            to={LOGIN}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
          >
            <XMarkIcon className="size-5 text-red-600" />
            <span className="hover:text-red-500 font-semibold">Logout</span>
          </Link>
        </div>
      </aside>
    </React.Fragment>
  );
}

SideBar.propTypes = {
  setOpenaside: PropTypes.func.isRequired,
  openaside: PropTypes.bool.isRequired,
};
