import { useState } from "react";
import { api } from "../apis/api";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      const res = await api.login(form);

      const data = await res.json();

      setMessage(data.message);

      if (res.ok)
        window.location.href = "/dashboard";

    } catch {
      setMessage("Login failed");
    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-1">
            Login to your account
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Message */}
        {message && (
          <div className={`mt-4 text-center text-sm font-medium ${
            message.toLowerCase().includes("success")
              ? "text-green-600"
              : "text-red-500"
          }`}>
            {message}
          </div>
        )}

        {/* Divider */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account?
          <a
            href="/register"
            className="text-indigo-600 hover:underline ml-1 font-medium"
          >
            Register
          </a>
        </div>

      </div>

    </div>

  );

}