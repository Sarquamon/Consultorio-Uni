import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div>Hola</div>
      <Link to="/">Home</Link>
      <Link to="/signin">Login</Link>
      <Link to="/signup">Register</Link>
      <Link to="/dates">Dates</Link>
    </nav>
  );
};
