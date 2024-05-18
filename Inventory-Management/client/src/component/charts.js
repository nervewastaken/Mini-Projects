import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
} from "recharts";

const Charts = () => {
  const [prod, setProd] = useState([]);
  const [formattedData, setFormattedData] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/addprod");
      const jsonData = await response.json();
      setProd(jsonData);
      const formatted = jsonData.map((item) => ({
        prodid: item.prodid,
        invsize: item.invsize,
      }));
      setFormattedData(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); 

  return (
    <div>
      <h2 style={{ marginLeft: "20px" }}>Inventory Data</h2>
      <BarChart width={1000} height={550} data={formattedData}>
        <XAxis dataKey="prodid">
          <Label value="Product ID" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label
            value="Inventory Size"
            angle={-90}
            position="insideLeft"
            style={{ marginRight: "20px" }}
          />
        </YAxis>
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="invsize" fill="#8884d8" barSize={30} />
      </BarChart>
    </div>
  );
};

export default Charts;
