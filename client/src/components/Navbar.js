import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

function Navbar({ title = "CMS" }) {
  const navigate = useNavigate();
  const { toast } = useContext(ToastContext);
  const { user, setUser } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/">
            <a className="navbar-brand">{title}</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/mycontacts">
                      <a className="nav-link">All Contacts</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create">
                      <a className="nav-link">Create</a>
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => {
                      setUser(null);
                      localStorage.clear();
                      toast.success("Logout");
                      navigate("/", { replace: true });
                    }}
                  >
                    <button className="btn btn-danger">Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login">
                      <a className="nav-link">Login</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register">
                      <a className="nav-link">Register</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
