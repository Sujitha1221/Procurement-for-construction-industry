import React from "react";
import Header from "../../components/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import AccountantSideNav from "../../components/SideNav/Accountant";

const AccountantLayout = () => {
  return (
    <>
      <div className="flex sticky top-0 left-0">
        <AccountantSideNav />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="p-[20px] overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountantLayout;
