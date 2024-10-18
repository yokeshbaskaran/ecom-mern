import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
    <div>
      <Header role="user" />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
