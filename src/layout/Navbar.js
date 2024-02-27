import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./Navbar.css";
import { useUser } from "../users/UserContext";
import ChatsPage from "../src1/chatsPage";
 
function Navbar() {
  const { userDetails, setUserData } = useUser();
  const navigate = useNavigate();
 
  const handleLogout = () => {
    setUserData("");
    navigate("/Signin");
  };
 
  return (
    <div>
    <section id="header1" className="navbar">
      <a>
        <img src={logo} alt="Logo" />
      </a>
      <h1 style={{color:"white"}}>Admin Dashboard</h1>
      <div className="nav-bar">
        <ul id="nav-links">

 
          <li className="ctn">
            <button
              type="button"
              className="btn"
              style={{ color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </section>
    </div>
  );
}
 
export default Navbar;