import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobalContext";
import { loginUser } from "../services/globalServices";

function Login() {
  useEffect(() => {
    document.title = "Briefly | Login";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { setUser } = useGlobalContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    const formData = {
      email,
      password,
    };
    try {
      setLoading(true);
      const res = await loginUser(formData);
      console.log(res);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          Login
        </button>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
