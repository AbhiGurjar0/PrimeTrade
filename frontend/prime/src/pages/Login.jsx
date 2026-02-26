import { useState } from "react";
import { api } from "../apis/api";
import {
  LogIn,
  Mail,
  Lock,
  Sparkles,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await api.login(form);
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) window.location.href = "/dashboard";
    } catch (error) {
      setMessage("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-md">
        {/* Decorative top bar */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-200/50 p-8 border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">
              Login to access your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                         focus:outline-none transition-all duration-200 
                         placeholder:text-gray-400 text-gray-700"
              />
              {form.email && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                         focus:outline-none transition-all duration-200 
                         placeholder:text-gray-400 text-gray-700"
              />
              {form.password && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>

            {/* Forgot password link - optional but nice */}
            <div className="flex justify-end">
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading || !form.email || !form.password}
              className={`
                w-full py-3.5 px-4 mt-2
                bg-gradient-to-r from-indigo-600 to-purple-600
                text-white font-medium rounded-xl
                shadow-lg shadow-indigo-200
                hover:shadow-xl hover:shadow-indigo-200
                hover:from-indigo-700 hover:to-purple-700
                focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:from-indigo-600 disabled:hover:to-purple-600
                disabled:hover:shadow-lg
                flex items-center justify-center gap-2
                group
              `}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Message Display */}
            {message && (
              <div
                className={`
                  mt-4 p-4 rounded-xl flex items-start gap-3 animate-slideIn
                  ${
                    message.toLowerCase().includes("success") ||
                    message.toLowerCase().includes("welcome")
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }
                `}
              >
                {message.toLowerCase().includes("success") ||
                message.toLowerCase().includes("welcome") ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`
                  text-sm flex-1
                  ${
                    message.toLowerCase().includes("success") ||
                    message.toLowerCase().includes("welcome")
                      ? "text-green-700"
                      : "text-red-700"
                  }
                `}
                >
                  {message}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500">
                  New here?
                </span>
              </div>
            </div>

            {/* Register link */}
            <div className="text-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors group"
              >
                <span>Create an account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
