import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { API_URL, useAdmins } from "../../context/AdminContext";

export const AddItem = ({ addPopup, setAddPopup }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const { dataChanged, setDataChanged } = useAdmins();

  const handleCreate = async (e) => {
    e.preventDefault();

    if (name !== "" && brand !== "" && description !== "") {
      const data = {
        pname: name,
        brand: brand,
        image: image,
        price: price,
        description: description,
      };

      const response = await fetch(API_URL + "/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Product is added");
        setDataChanged(!dataChanged);
        setAddPopup(!addPopup);
      } else {
        console.log("Product not added");
      }
    }
  };

  return (
    <>
      <div className="bg-overlay"></div>
      <div className="bg-data">
        <section className="border w-[450px] mx-auto bg-white text-black rounded-lg overflow-hidden z-10 opacity-100">
          <div className="px-3 py-4 flex justify-between items-center gap-3 border-2 border-slate-300">
            <h2 className="text-3xl font-medium">Add Product</h2>

            <MdAddShoppingCart size={30} color="#4759FF" />
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
              <button onClick={handleCreate} className="button">
                Create Product
              </button>

              <button onClick={() => setAddPopup(!addPopup)} className="button">
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};
