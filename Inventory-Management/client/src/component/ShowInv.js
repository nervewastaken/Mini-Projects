import React, { useState, useEffect } from "react";
import "./ShowInv.css";

const ShowInv = () => {
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="scroll-container">
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Inventory</th>
            <th>Comments</th>
            <th>Supervisor</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {prod.map((product) => (
            <tr key={product.prodid}>
              <td>{product.prodid}</td>
              <td>{product.prodname}</td>
              <td>{product.prodprice}</td>
              <td>{product.invsize}</td>
              <td>{product.comments}</td>
              <td>{product.supervisor}</td>
              <td>{product.dateup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowInv;
