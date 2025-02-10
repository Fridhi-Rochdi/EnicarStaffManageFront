import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";
import NavBar from "./navbar";
import useAsideStore from "../store/asidestore";

export default function PrimaryLayout() {
  const { openaside, setOpenaside } = useAsideStore();

  return (
    <React.Fragment>
      <SideBar openaside={openaside} setOpenaside={setOpenaside} />
      <div className="ml-auto mb-6 lg:w-[75%] 2xl:w-[85%]">
        <NavBar setOpenaside={setOpenaside} />
        <div className="container pt-3 px-2 mt-2 mx-auto">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
