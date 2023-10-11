import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import DeliveryLayout from "../layouts/DeliveryLayout";
import OrderLayout from "../layouts/OrderLayout";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" />
          </Route>
          <Route path="purchaseRequisition" element={<DeliveryLayout />}>
            <Route path="view-requisition" />
          </Route>
          <Route path="order" element={<OrderLayout />}>
            <Route path="view-order" />
            <Route path="add-order" />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
