import { useState } from "react";
import { useAuth, API_URL } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        password,
      };
      // console.log("data", newUser);

      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        console.log("no response!!!");
      }
    } catch (error) {
      console.log("Error!" + error.message);
    }
  };

  return (
    <>
      <form className="max-w-[600px] h-full mx-auto mt-20 flex flex-col justify-start items-center gap-5">
        <h2 className="py-5 text-3xl capitalize font-medium">User Login</h2>

        <div className="mx-auto grid grid-cols-2 grid-rows-2 gap-5 text-end">
          <label htmlFor="e-mail">Email:</label>

          <input
            id="e-mail"
            className="py-1 px-2 border border-gray-400 rounded-md"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="pass-word">Password:</label>

          <input
            id="pass-word"
            className="py-1 px-2 border border-gray-400 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="py-2 px-8 text-white bg-gray-800 rounded-lg"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
