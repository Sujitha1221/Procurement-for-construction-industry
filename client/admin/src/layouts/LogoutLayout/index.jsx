import React, { useEffect } from 'react';

const logOut = (e) => {
  localStorage.removeItem("ProcurementInfo");
  localStorage.removeItem("AdminInfo");
  localStorage.removeItem("DriverInfo");
  window.location.replace("/");
}

export default function LogOut() {
  useEffect(() => {
    logOut();
  }, []); 

  return (
    <></>
  );
}
