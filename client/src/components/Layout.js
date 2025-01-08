import React from "react";
import Navbar from "./Navbar";

function Layout({navbar=true, children }) {
  return (
    <>
      {navbar && <Navbar />}
      <div className="container mt-3">{children}</div>
    </>
  );
}

export default Layout;
