import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import UserLayout from "./layouts/UserLayout";
import Homepage from "./pages/user/Homepage";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Cart from "./pages/user/Cart";

import { useAuth } from "./context/AuthContext";
import { useAdmins } from "./context/AdminContext";

import AdminLayout from "./layouts/AdminLayout";
import Adminpage from "./pages/admin/Adminpage";
import AdminLogin from "./pages/admin/AdminLogin";
import Products from "./pages/products/Products";

import { EditItem } from "./pages/products/EditItem";

const App = () => {
  const { userData } = useAuth();
  const { adminData } = useAdmins();

  return (
    <div>
      <Routes>
        {/* User */}

        <Route path="/" element={<UserLayout />}>
          <Route
            index
            element={!userData ? <Navigate to="/login" /> : <Homepage />}
          />
          <Route path="signup" element={<Register />} />
          <Route
            path="login"
            //element={<Login />}
            element={!userData ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="cart"
            //element={<Login />}
            element={!userData ? <Login /> : <Cart />}
          />
        </Route>

        {/*    */}

        <Route path="admin" element={<AdminLayout />}>
          {/* Admin */}

          <Route
            index
            element={adminData ? <Adminpage /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="login"
            // element={<AdminLogin />}
            element={!adminData ? <AdminLogin /> : <Navigate to="/admin" />}
          />
          <Route
            path="products"
            // element={<Products />}
            element={!adminData ? <Navigate to="/admin/login" /> : <Products />}
          />

          <Route path="products/:id" element={<EditItem />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
