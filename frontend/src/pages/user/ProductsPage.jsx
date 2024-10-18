import { useAuth } from "../../context/AuthContext";
import SingleProduct from "./SingleProduct";

const ProductsPage = () => {
  const { products } = useAuth();
  // console.log("prod", products);

  return (
    <div className="p-3">
      {products ? (
        <div className="grid grid-rows-3 grid-cols-2 lg:grid-cols-4  gap-5">
          {products.map((product, idx) => (
            <SingleProduct product={product} key={idx} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductsPage;
