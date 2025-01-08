import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import  {AuthContext } from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

function Login() {
  const {toast}=useContext(ToastContext)

  const { loginUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    // toast.success("loggin in the user");
    if (!credentials.email || !credentials.password) {
      toast.error("please enter the all fields");
      return;
    }

   await loginUser(credentials)
  };
   
  return (
    <div>
      {/* <ToastContainer autoclose={2000} /> */}
      <h3>login page</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInput" className="form-label mt-4">
            Email address
          </label>
          <input
            // type="email"
            className="form-control"
            id="exampleInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary my-3" />
        <p>
          Don't have an account ? <Link to="/Register">create one</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
