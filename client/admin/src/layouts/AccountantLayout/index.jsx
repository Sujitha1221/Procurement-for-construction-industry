import React from "react";
import Header from "../../components/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import AccountantSideNav from "../../components/SideNav/Accountant";
import ViewInvoices from "./AllInvoices";
import ApprovedInvoices from "./ApprovedInvoices";
import MakePayment from "./MakePayment";

const AccountantLayout = () => {
  return (
    <>
      <div className="flex sticky top-0 left-0">
        <AccountantSideNav />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="p-[20px] overflow-y-scroll">
            <Outlet />
            <Routes>
              <Route path="view-invoices" element={<ViewInvoices />} />
              <Route path="approved-invoices" element={<ApprovedInvoices />} />
              <Route path="make-payment/:invoiceId" element={<MakePayment />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountantLayout;
