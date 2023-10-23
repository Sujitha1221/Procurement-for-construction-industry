import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";

const CommonLayout = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};

export default CommonLayout;
