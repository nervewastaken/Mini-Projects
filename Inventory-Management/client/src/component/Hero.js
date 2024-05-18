import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="mainhero">
      <div className="hero">
        <div className="Welcome">
          <h1 style={{ color: "white" }}>Inventory for Cool People!</h1>
          <Link to={"/Products"}>
            <button style={{ minWidth: "250px" }} class="button-64">
              <span class="text">Add a product</span>
            </button>
          </Link>
          <br></br>
          <Link to={"/Inventory"}>
            <button style={{ minWidth: "250px" }} class="button-64">
              <span class="text">Update Inventory</span>
            </button>
          </Link>
          <br></br>
          <Link to={"/Analytics"}>
            <button style={{ minWidth: "250px" }} class="button-64">
              <span class="text">View Analytics</span>
            </button>
          </Link>
          <br></br>
          <Link to={"/AboutUs"}>
            <button style={{ minWidth: "250px" }} class="button-64">
              <span class="text">Contact Us!</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
