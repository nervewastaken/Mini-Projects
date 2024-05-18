// Products.jsx
import React, { useState } from "react";
import Navbar from "../component/Navbar";
import InputProd from "../component/inputprod";
import ShowProd from "../component/ShowProd";
import ChatbotEmbed from "../component/chatbot";

const Products = () => {
  const [prod, setProd] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/addprod");
      const jsonData = await response.json();
      setProd(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="aboutus">
      <Navbar />
      <InputProd fetchProducts={fetchProducts} />
      <ShowProd />
      <ChatbotEmbed />
    </div>
  );
};

export default Products;
