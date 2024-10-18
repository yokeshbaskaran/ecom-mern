import { useAuth } from "../../context/AuthContext";

const CartItem = ({ id, quantity }) => {
  //   console.log("cart-props", id, quantity);

  const { products } = useAuth();
  // console.log("products", products);

  const item = products.find((i) => i._id === id);

  return (
    <>
      <tr className="border-b">
        {/* <td className="py-5">no</td> */}
        <td>{item.pname}</td>
        <td>
          <img
            src={item.image}
            className="w-[80px] h-[80px] mx-auto p-1 object-contain"
          />
        </td>
        {/* <td>{item.price}</td> */}
        {/* <td>
          <span className="bg-black mx-1 p-1 px-2 rounded-full text-white">
            {quantity}
          </span>
        </td> */}
        <td>
          {item.price} x{" "}
          <span className="bg-black mx-1 p-1 px-2 rounded-full text-white">
            {quantity}
          </span>
        </td>
        <td>{item.price * quantity}</td>
      </tr>
    </>
  );
};

export default CartItem;

{
  /* <tr className="border-b">
<td className="py-5">no</td>
<td>{item.pname}</td>
<td>
  <img
    src={item.image}
    className="w-[80px] h-[80px] mx-auto p-1 object-contain"
  />
</td>
<td>
  <button className="mx-1 p-1 px-3 rounded text-black border-2 shadow-lg">
    -
  </button>

  <span className="bg-black mx-1 p-1 px-2 rounded-full text-white">
    {item.quantity}
  </span>

  <button
    onClick={() => item._id}
    className="mx-1 p-1 px-3 rounded text-black border-2 shadow-lg"
  >
    +
  </button>
</td>
<td>{item.price}</td>
</tr> */
}
