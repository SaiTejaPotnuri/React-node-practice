// src/routes/layouts/RootLayout.jsx
import { Outlet } from "react-router-dom";
import Invitation from "../components/Invitation";
const RootLayout = () => {
  return (
    <div className="main-container">
      <Invitation />
      <Outlet />
    </div>
  );
};

export default RootLayout;