import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../apis/api";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.isLoggedIn(); // protected API
        console.log(res);

        if (res.ok) setIsAuth(true);
        else setIsAuth(false);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
