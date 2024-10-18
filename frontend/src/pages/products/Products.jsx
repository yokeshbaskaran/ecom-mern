import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { API_URL, useAdmins } from "../../context/AdminContext";
import { AddItem } from "./AddItem";
import { Link } from "react-router-dom";

const Products = () => {
  const [addPopup, setAddPopup] = useState(false);
  const { products, dataChanged, setDataChanged } = useAdmins();

  const deleteProduct = async (id) => {
    if (confirm("Are you sure want to delete")) {
      console.log("Product is deleted");

      try {
        const response = await fetch(API_URL + `/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("Product is deleted!!");
          setDataChanged(!dataChanged);
        } else {
          console.log("No response!!");
        }
      } catch (error) {
        console.log("Error" + error);
      }
    }
  };

  return (
    <div>
      <div className="max-w-[850px] mx-auto my-8 px-3">
        <h2 className="text-4xl">Products Page</h2>

        <div className="py-3 flex justify-between items-end">
          <h2 className="text-lg"> List of all Products</h2>

          <button className="button" onClick={() => setAddPopup(!addPopup)}>
            Add Product
          </button>
        </div>

        <section>
          {addPopup && (
            <AddItem addPopup={addPopup} setAddPopup={setAddPopup} />
          )}
        </section>

        <table className="table-fixed border w-full rounded-lg">
          <thead className="text-center">
            <tr className="border-2 rounded-full">
              <th className="py-3">S.No</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Image</th>
              <th>Price</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {products ? (
              products.map((item, idx) => (
                <tr className="border-b" key={`product-${idx}`}>
                  <td className="py-5">{idx + 1}</td>
                  <td>{item.pname}</td>
                  <td>{item.brand}</td>
                  <td>
                    <img
                      src={item.image}
                      className="w-[100px] h-[100px] p-1 object-contain"
                    />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <Link to={`/admin/products/${item._id}`}>
                      <FiEdit
                        size={40}
                        color="green"
                        className="border py-1 px-2 bg-[#F4F5F7] rounded-md"
                      />
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => deleteProduct(item._id)}>
                      <MdDeleteForever
                        size={40}
                        color="#E23F44"
                        className="border py-1 px-2 bg-[#F4F5F7] rounded-md"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
