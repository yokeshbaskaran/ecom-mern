import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CartItem from "./CartItem";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const { cart, products } = useAuth();

  // console.log("cart", cart);
  // console.log("products", products);

  useEffect(() => {
    const totalAmount = cart.reduce((acc, curr) => {
      const findItem = products.find((i) => i._id === curr.id);
      // console.log("found", findItem);

      const mutliply = (findItem?.price || 0) * curr.quantity;
      const final = acc + mutliply;

      return final;
    }, 0);

    setTotal(totalAmount);
  }, [products, cart]);

  return (
    <div>
      <section className="p-3">
        <h2 className="my-5 text-3xl text-center">Cart Page</h2>

        <div>
          {cart.length > 0 ? (
            <>
              <table className="table-fixed border w-full rounded-lg">
                <thead className="text-center">
                  <tr className="border-2 rounded-full">
                    {/* <th className="py-3">S.No</th> */}
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price & Quantity</th>
                    {/* <th>Quantity</th> */}
                    <th>Total Amount</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {cart.map((item, idx) => (
                    <CartItem {...item} key={`product-${idx}`} />
                  ))}
                </tbody>
              </table>

              <div className="my-8 text-center">
                <p className="text-gray-400">
                  Total Price
                  <span className="text-2xl text-black"> Rs.{total} </span>
                </p>
              </div>
            </>
          ) : (
            <p className="my-5 text-xl text-center">Your cart is Empty!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
