import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbars">
      <Link style={{ marginRight: "10px" }} to={"/"}>
        <button className="btn">Home</button>
      </Link>

      <Link style={{ marginRight: "10px" }} to={"/Products"}>
        <button className="btn">Products</button>
      </Link>

      <Link style={{ marginRight: "10px" }} to={"/Inventory"}>
        <button className="btn">Inventory</button>
      </Link>

      <Link style={{ marginRight: "10px" }} to={"/Analytics"}>
        <button className="btn">Analytics</button>
      </Link>
      <Link style={{ marginRight: "10px" }} to={"/AboutUs"}>
        <button className="btn">Contact Us</button>
      </Link>
    </div>
  );
};

export default Navbar;
