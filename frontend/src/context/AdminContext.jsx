import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AdminContext = createContext();

export function useAdmins() {
  return useContext(AdminContext);
}

// LIVE_PAGE_URL = "https://ecoms-mern.onrender.com/";

// export const API_URL = "http://localhost:3002/api/products";
// export const ADMIN_API_URL = "http://localhost:3002/api/admin";

export const API_URL = "https://ecoms-mern.onrender.com/api/products";
export const ADMIN_API_URL = "https://ecoms-mern.onrender.com/api/admin";

export const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [dataChanged, setDataChanged] = useState(false);
  const [products, setProducts] = useState(null);
  // console.log("Admin context", adminData);

  useEffect(() => {
    const myCookie = Cookies.get("access_token2");
    // console.log("admin-token",myCookie);
    if (myCookie) {
      fetchAdminData();
      getProducts();
    }
  }, [dataChanged]);

  const fetchAdminData = async () => {
    const response = await fetch(ADMIN_API_URL + "/profile", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setAdminData(data);
    } else {
      console.log("No response!!!");
    }
  };

  const getProducts = async () => {
    const response = await fetch(API_URL, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      setProducts(data.data);
    } else {
      console.log("No response!!!");
    }
  };

  const contextValues = {
    dataChanged,
    setDataChanged,
    adminData,
    setAdminData,
    getProducts,
    products,
    setProducts,
  };

  return (
    <>
      <AdminContext.Provider value={contextValues}>
        {children}
      </AdminContext.Provider>
    </>
  );
};
