import React from "react";
import SupplerSideNav from "../../components/SideNav/supplier";
import Header from "../../components/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import AllOrders from "./AllOrders";
import ApprovedOrder from "./ViewApprovedOrders";
import CreateInvoice from "./CreateInvoice";

const SupplierLayout = () => {
  return (
    <>
      <div className="flex sticky top-0 left-0">
        <SupplerSideNav />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="p-[20px] overflow-y-scroll">
            <Outlet />
            <Routes>
              <Route path="view-orders" element={<AllOrders />} />
              <Route path="approved-orders" element={<ApprovedOrder />} />
              <Route path="create-invoice/:id" element={<CreateInvoice />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierLayout;
