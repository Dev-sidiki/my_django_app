import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/products">Catalogue</Link>
        </li>
        <li>
          <Link to="/apropos">A propos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
