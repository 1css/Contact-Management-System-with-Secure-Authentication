import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, [user]);
  return (
    <div>
      <div class="jumbotron">
        <h1 class="display-4">Welcome {user ? user.name : null}</h1>

        <hr class="my-4" />

        <a class="btn btn-info" href="#" role="button">
          Add contacts
        </a>
      </div>
    </div>
  );
}

export default Home;
