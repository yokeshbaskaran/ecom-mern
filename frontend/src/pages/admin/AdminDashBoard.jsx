import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { API_URL } from "../../context/AuthContext";
import { useAdmins } from "../../context/AdminContext";
import { useEffect, useState } from "react";

const AdminDashBoard = () => {
  const { products, adminData } = useAdmins();
  const [usersList, setUsersList] = useState();
  const [ordersList, setOrdersList] = useState();

  useEffect(() => {
    if (adminData) {
      fetchAllUsers();
      setOrdersList("");
    }
  }, [usersList, adminData]);

  const fetchAllUsers = async () => {
    const response = await fetch(API_URL + "/allUsers", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      // console.log("alluser-data", data);
      setUsersList(data);
    } else {
      console.log("No data from fetched");
    }
  };

  return (
    <>
      <div className="max-w-[850px] mx-auto p-5 flex justify-between items-center">
        <section className="py-2 px-5 border-2 rounded-md">
          <div className="py-2 flex items-center gap-3">
            <FiShoppingCart
              size={40}
              color="#6366F1"
              className="border py-1 px-2 bg-[#F4F5F7] rounded-md"
            />
            <h2 className="text-3xl capitalize">Products</h2>
          </div>

          <div className="my-3">
            <p className="text-gray-500">
              Products Count:
              <span className="text-xl text-black font-bold px-1">
                {products && products.length}
              </span>
            </p>

            <button className="button">
              <Link to="/admin/products">Add Product</Link>
            </button>
          </div>
        </section>

        <section className="py-2 px-5 border-2 rounded-md">
          <div className="py-2 flex items-center gap-3">
            <FaUsers
              size={40}
              color="#6366F1"
              className="border py-1 px-2 bg-[#F4F5F7] rounded-md"
            />
            <h2 className="text-3xl capitalize">User lists</h2>
          </div>

          <div className="my-3">
            <p className="text-gray-500">
              No of Users:
              <span className="text-xl text-black font-bold px-1">
                {usersList && usersList.length}
              </span>
            </p>
          </div>

          <div>
            <h2 className="text-sm">List of Users:</h2>

            <div>
              {/*User name in display */}
              {usersList &&
                usersList.map((user, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    {idx + 1}.
                    <p>
                      <span className="capitalize">
                        {user?.email.split("@")[0]}
                      </span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="py-2 px-5 border-2 rounded-md">
          <div className="py-2 flex items-center gap-3">
            <TbTruckDelivery
              size={40}
              color="#6366F1"
              className="border py-1 px-2 bg-[#F4F5F7] rounded-md"
            />
            <h2 className="text-3xl capitalize">Orders</h2>
          </div>

          <div className="my-3">
            <p className="text-gray-500">
              List of Users:
              <span className="text-xl text-black font-bold px-1">
                {ordersList ? (
                  ordersList.length
                ) : (
                  <span className="text-sm text-gray-600">No orders yet</span>
                )}
              </span>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashBoard;
