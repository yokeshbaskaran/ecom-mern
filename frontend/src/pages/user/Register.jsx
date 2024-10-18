import { useState } from "react";
import { API_URL } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        password,
      };
      console.log("data", newUser);

      const response = await fetch(API_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        // const data = await response.json();
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        console.log("no response!!!");
      }
    } catch (error) {
      console.log("Error!" + error.message);
    }
  };

  return (
    <>
      <form className="max-w-[600px] mx-auto mt-10 py-3 flex flex-col justify-center items-center gap-5">
        <h2 className="py-5 text-3xl uppercase font-semibold">Register User</h2>
        <div className="flex items-center gap-3">
          <label htmlFor="e-mail">Email:</label>

          <input
            id="e-mail"
            className="py-1 px-2 border border-gray-400 rounded-md"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="pass-word">Password:</label>
          <input
            id="pass-word"
            className="py-1 px-2 border border-gray-400 rounded-md"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="py-2 px-4 text-white bg-gray-800 rounded-lg"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </>
  );
};

export default Register;
