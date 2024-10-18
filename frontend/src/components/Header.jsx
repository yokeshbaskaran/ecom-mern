import { Link, useNavigate } from "react-router-dom";
import { API_URL, useAuth } from "../context/AuthContext";
import { ADMIN_API_URL, useAdmins } from "../context/AdminContext";

const Header = ({ role }) => {
  const { userData, setUserData, cart } = useAuth();
  const { adminData, setAdminData } = useAdmins();

  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      setUserData(null);
      navigate("/");
      console.log("User is logout");
    }
  };

  const adminLogout = async (e) => {
    e.preventDefault();

    const response = await fetch(ADMIN_API_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response) {
      setAdminData(null);
      localStorage.removeItem("shopping-cart");
      // localStorage.setItem("shopping-cart", JSON.stringify([]));
      navigate("/admin");
      console.log("Admin is logout");
    }
  };

  return (
    <>
      {role === "user" ? (
        <>
          <nav
            className={`h-[50px] border p-2 flex justify-between items-center text-white bg-gray-500`}
          >
            <h1 className="text-2xl">
              <Link to="/admin">Shopify-A</Link>
            </h1>

            <ul className="flex gap-4 items-center">
              {userData ? (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/cart">
                    Cart
                    {cart.length > 0 ? (
                      <span className="bg-white mx-1 px-1 border rounded-full text-black">
                        {cart.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </Link>
                  <Link to="/logout">
                    <button onClick={logout}>Logout</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">Signup</Link>
                  <Link to="/login">Login</Link>
                </>
              )}
            </ul>
          </nav>
        </>
      ) : (
        <>
          <nav
            className={`h-[50px] border p-2 flex justify-between items-center text-white bg-black opacity-80`}
          >
            <h1 className="text-2xl">
              <Link to="/">Admin-U</Link>
            </h1>

            <ul className="flex gap-4 items-center">
              {/* <Link to="/signup">Signup</Link> */}
              <Link to="/admin/products">Products</Link>
              {adminData ? (
                <>
                  <Link to="/admin">
                    <button onClick={adminLogout}>Logout</button>
                  </Link>
                </>
              ) : (
                <Link to="/admin/login">Login</Link>
              )}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
