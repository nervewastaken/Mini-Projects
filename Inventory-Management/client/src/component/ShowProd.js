import React, { useState, useEffect } from "react";
import "./ShowProd.css";

const ShowProd = () => {
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

  const deleteProd = async (prodid) => {
    try {
      const deleteprod = await fetch(
        `http://localhost:4000/addprod/${prodid}`,
        {
          method: "DELETE",
        },
      );
      fetchProducts();
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {prod.map((product) => (
            <tr key={product.prodid}>
              <td>{product.prodid}</td>
              <td>{product.prodname}</td>
              <td>{product.prodprice}</td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => deleteProd(product.prodid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProd;
