import { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { API_URL, useAdmins } from "../../context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";

export const EditItem = ({ editPopup, setEditPopup }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const { dataChanged, setDataChanged } = useAdmins();

  const navigate = useNavigate();
  const { id } = useParams();
  const postId = id;

  useEffect(() => {
    fetchSingleItem();
  }, [postId]);

  const fetchSingleItem = async () => {
    const response = await fetch(API_URL + `/${postId}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      setDataChanged(!dataChanged);

      setName(data.pname);
      setBrand(data.brand);
      setImage(data.image);
      setPrice(data.price);
      setDescription(data.description);
    } else {
      console.log("No response!!!");
    }
  };

  const editProduct = async (e) => {
    console.log("Edit product");

    e.preventDefault();

    if (name !== "" && brand !== "" && description !== "") {
      const data = {
        pname: name,
        brand: brand,
        image: image,
        price: price,
        description: description,
      };

      const response = await fetch(API_URL + `/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Product is updated");
        setDataChanged(!dataChanged);
        navigate("/admin/products");
      } else {
        console.log("NOT! updated");
      }
    }
  };

  return (
    <>
      <div className="bg-overlay"></div>
      <div className="bg-data">
        <section className="border w-[450px] mx-auto bg-white text-black rounded-lg overflow-hidden z-10 opacity-100">
          <div className="px-3 py-4 flex justify-between items-center gap-3 border-2 border-slate-300">
            <h2 className="text-3xl font-medium">Edit Product</h2>

            <MdAddShoppingCart size={30} color="green" />
          </div>

          <form className="p-2">
            <table className="max-w-[500px] mx-auto">
              <tbody>
                <tr>
                  <td className="py-3 pr-2 text-right">Name:</td>
                  <td>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="py-3 pr-2 text-right">Brand:</td>
                  <td>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="Enter brand"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="py-3 pr-2 text-right">Image:</td>
                  <td>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Enter Image"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="py-3 pr-2 text-right">Price:</td>
                  <td>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter price"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="py-3 pr-2 text-right">description:</td>
                  <td>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="px-1 py-1 flex items-center gap-3">
              <button onClick={editProduct} className="button">
                Edit Product
              </button>

              <button
                onClick={() => {
                  navigate("/admin/products");
                  setEditPopup(!editPopup);
                }}
                className="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};
