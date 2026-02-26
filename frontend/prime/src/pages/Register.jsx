import { useState } from "react";
import { api } from "../apis/api";
import { UserPlus, Mail, Lock, User, Sparkles, AlertCircle, CheckCircle } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage("");
    setMessageType(null);
    
    const res = await api.register(form);
    const data = await res.json();
    if(res.ok) {
      setForm({ name: "", email: "", password: "" });
      window.location.href = "/login"; 
    }

    
    setMessage(data.message);
    setMessageType(res.ok ? 'success' : 'error');
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
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
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">
              Join us to start managing your tasks
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name Input */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                         focus:outline-none transition-all duration-200 
                         placeholder:text-gray-400 text-gray-700"
              />
              {form.name && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>

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
                  <div className={`w-2 h-2 rounded-full ${
                    form.password.length >= 6 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
              )}
            </div>

            {/* Password strength indicator */}
            {form.password && (
              <div className="space-y-1.5">
                <div className="flex gap-1 h-1">
                  <div className={`flex-1 rounded-full transition-all duration-300 ${
                    form.password.length >= 1 ? 'bg-red-500' : 'bg-gray-200'
                  }`}></div>
                  <div className={`flex-1 rounded-full transition-all duration-300 ${
                    form.password.length >= 4 ? 'bg-yellow-500' : 'bg-gray-200'
                  }`}></div>
                  <div className={`flex-1 rounded-full transition-all duration-300 ${
                    form.password.length >= 6 ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                </div>
                <p className="text-xs text-gray-500">
                  {form.password.length < 6 
                    ? 'Password should be at least 6 characters' 
                    : 'Strong password!'}
                </p>
              </div>
            )}

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !form.name || !form.email || !form.password}
              className={`
                w-full py-3.5 px-4 mt-6
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
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>

            {/* Message Display */}
            {message && (
              <div 
                className={`
                  mt-4 p-4 rounded-xl flex items-start gap-3 animate-slideIn
                  ${messageType === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : messageType === 'error'
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-blue-50 border border-blue-200'
                  }
                `}
              >
                {messageType === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : messageType === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex-shrink-0 mt-0.5"></div>
                )}
                <p className={`
                  text-sm flex-1
                  ${messageType === 'success' ? 'text-green-700' : ''}
                  ${messageType === 'error' ? 'text-red-700' : ''}
                  ${!messageType ? 'text-blue-700' : ''}
                `}>
                  {message}
                </p>
              </div>
            )}

            {/* Login link - optional but nice to have */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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