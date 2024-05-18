// InputProd.js
import React, { Fragment, useState } from "react";
import "./inputprod.css";

const InputProd = ({ fetchProducts }) => {
  const [prodid, setProdid] = useState("");
  const [prodname, setProdname] = useState("");
  const [price, setPrice] = useState("");

  const onsubmitform = async (e) => {
    e.preventDefault();
    try {
      const body = { prodid, prodname, price };

      if (!prodid || !prodname || !price) {
        window.alert("Please fill in all details.");
        return;
      }

      if (prodid < 0 || !Number.isInteger(+prodid)) {
        window.alert("Product ID can't be negative or float");
        return;
      }

      if (price < 0 || !Number.isInteger(+price)) {
        window.alert("Product Price can't be negative or float");
        return;
      }

      const response = await fetch("http://localhost:4000/addprod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Product added successfully");

        fetchProducts();
        setProdid("");
        setProdname("");
        setPrice("");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <div className="space"></div>
      <form onSubmit={onsubmitform}>
        <input
          type="number"
          value={prodid}
          onChange={(e) => setProdid(e.target.value)}
          placeholder="Product ID"
        />
        <input
          type="text"
          value={prodname}
          onChange={(e) => setProdname(e.target.value)}
          placeholder="Product Name"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <button className="btn-success" type="submit">
          Add Product
        </button>
        <br></br>
      </form>
    </Fragment>
  );
};

export default InputProd;
