import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

function Register() {
  
  const {toast}=useContext(ToastContext)
  const { registerUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("please enter the all fields");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Password dosen't match");
      return;
    }
    const userdata = { ...credentials, confirm: undefined };
    registerUser(userdata);
  };
  return (
    <div>
      

      <h3>Register</h3>

      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="nameInput" class="form-label mt-4">
            Your Name
          </label>
          <input
            type="text"
            class="form-control"
            id="nameInput"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
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

        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Enter confirmPassword"
            required
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary my-3"
        />
        <p>
          Already have an account ? <Link to="/Login">Login one</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
