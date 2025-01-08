import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import CreateContact from "./pages/CreateContact";
import AllContact from "./pages/AllContact";
import EditContact from "./pages/EditContact";

function App() {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateContact />} />
          <Route path="/mycontacts" element={<AllContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </AuthContextProvider>
    </ToastContextProvider>
  );
}

export default App;
