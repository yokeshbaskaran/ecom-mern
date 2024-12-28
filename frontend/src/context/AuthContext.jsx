import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

//------------------- Deployment ---------------------
// if local-host
//const WEB_URL = "http://localhost:3002/";
const WEB_URL = "https://shop-mart-wg72.onrender.com/";
export const API_URL = WEB_URL + "api/auth";
// console.log(API_URL);
//------------------- Deployment ---------------------

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  // console.log("User context", userData);
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useLocalStorage("shopping-cart", []);
  // const [cart, setCart] = useState([]);
  // console.log("Cart", cart);

  useEffect(() => {
    const myCookieToken = Cookies.get("access_token");
    // console.log("user-token", myCookieToken);

    if (myCookieToken) {
      fetchUserData();
      getProducts();
    }
  }, []);

  const fetchUserData = async () => {
    const response = await fetch(API_URL + "/profile", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      // console.log("user-data", data);
      setUserData(data);
    } else {
      console.log("User-data not fetched!");
    }
  };

  {
    /* Products */
  }
  const getProducts = async () => {
    const response = await fetch(API_URL + "/product", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      // console.log("data", data);
      setProducts(data);
    } else {
      console.log("no products!");
    }
  };

  {
    /*cart*/
  }
  // const handleAddcart = (id) => {

  //   const cartItem = products.find((prod) => prod._id === id);

  //   const withQuantity = { ...cartItem, quantity: 1 };
  //   // console.log("exchange", withQuantity);

  //   setCart([...cart, withQuantity]);
  // };

  // const handleRemovecart = (id) => {
  //   const removeItem = cart.filter((prod) => prod._id !== id);
  //   setCart(removeItem);
  // };

  const getItemQuantity = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const incremQuantity = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decremQuantity = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeCart = (id) => {
    setCart((curr) => {
      return curr.filter((item) => item.id !== id);
    });
  };

  const contextValues = {
    userData,
    setUserData,
    fetchUserData,
    products,
    setProducts,
    cart,
    setCart,
    // handleAddcart,
    // handleRemovecart,
    getItemQuantity,
    incremQuantity,
    decremQuantity,
    removeCart,
  };

  return (
    <>
      <AuthContext.Provider value={contextValues}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export function useLocalStorage(key, intialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof intialValue === "function") {
      return intialValue();
    } else {
      return intialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
