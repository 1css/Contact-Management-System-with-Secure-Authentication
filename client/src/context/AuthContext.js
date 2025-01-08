import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastContext from "./ToastContext";
import { replace, useLocation, useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //check if user is logged in.

  useEffect(() => {
    checkUSerLoggedIn();
  }, []);

  const checkUSerLoggedIn = async () => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();

      if (!result.error) {
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 500);
        } else {
          navigate(location.pathname ? location.pathname : "/");
        }
        setUser(result);
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //login request
  const loginUser = async (userData) => {
    console.log(userData, "userData");
    
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "content-Type": "application/JSON",
        },
        body: JSON.stringify({ ...userData }),
      });

      const result = await res.json();
      if (!result.error) {
        console.log(result);
        localStorage.setItem("token", result.token);
        setUser(result.user);
        toast.success(`logged in ${result.user.name}`);
        navigate("/", { replace: true });
      } else {
        console.log(result.error);
        toast.error(result.error);
        // setError(result.error)
        // toast.error(error)
        // setError(null)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const registerUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/register`, {
        method: "POST",
        headers: {
          "content-Type": "application/JSON",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();

      if (!result.error) {
        toast.success("user register successful");
        navigate("/login", { replace: true });
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
      <ToastContainer autoclose={2000} />
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
