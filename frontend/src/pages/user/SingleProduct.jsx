import { useAuth } from "../../context/AuthContext";
import { BsCartPlus } from "react-icons/bs";

const SingleProduct = ({ product }) => {
  const { brand, createdAt, description, image, price, pname, updatedAt, _id } =
    product;
  //   console.log("product", product);

  const { getItemQuantity, incremQuantity, decremQuantity, removeCart } =
    useAuth();

  function timeChange(givenDate) {
    const date = new Date(givenDate);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  }

  const currencyType = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "INR",
    currencyDisplay: "symbol",
  });

  // const dateIntls = new Intl.DateTimeFormat(undefined, {
  //   year: "numeric",
  //   month: "short",
  //   weekday: "short",
  //   day: "numeric",
  //   hour: "2-digit",
  //   hour12: true,
  // });
  // console.log("date", dateIntls.format(new Date()));

  const quantity = getItemQuantity(_id);
  // console.log("quan", _id, quantity);

  return (
    <div>
      <div className="p-2 flex flex-col items-center border-2 gap-1 rounded-lg shadow-lg">
        <span className="hidden">{_id}</span>
        <span className="hidden">{createdAt}</span>

        <div>
          <img
            className="w-[200px] h-[200px] p-2 py-3 object-contain"
            src={image}
            alt={`${pname}-img`}
          />
        </div>

        <h2 className="text-2xl capitalize">{pname}</h2>
        <span className="uppercase">{brand}</span>

        <p className="text-sm">
          Rs.{" "}
          <span className="text-xl font-bold">
            {currencyType.format(price)}
          </span>
        </p>
        <p className="px-8 text-center">{description}</p>
        <span className="text-xs">{timeChange(updatedAt)}</span>

        <div className="py-2 flex flex-col gap-0">
          {quantity === 0 ? (
            <button
              className="button flex items-center gap-2"
              onClick={() => incremQuantity(_id)}
            >
              Add to cart
              <BsCartPlus />
            </button>
          ) : (
            <>
              <div className="p-2 flex gap-3 text-xl">
                <button
                  className="bg-black mx-1 px-[11px] border rounded-full text-white"
                  onClick={() => decremQuantity(_id)}
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  className="bg-black mx-1 px-2 border rounded-full text-white"
                  onClick={() => incremQuantity(_id)}
                >
                  +
                </button>
              </div>

              <button className="button" onClick={() => removeCart(_id)}>
                Remove
              </button>
            </>
          )}

          {/* {cart.includes(product) ? (
            <button
              className="button flex items-center gap-2 bg-red-500"
              onClick={() => handleRemovecart(_id)}
            >
              Remove from cart
              <BsCartPlus />
            </button>
          ) : (
            <button
              className="button flex items-center gap-2"
              onClick={() => handleAddcart(_id)}
            >
              Add to cart
              <BsCartPlus />
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
