import React from "react";
import AddInventory from "../component/AddInventory";
import ShowInv from "../component/ShowInv";
import Navbar from "../component/Navbar";
import ChatbotEmbed from "../component/chatbot";

const Inventory = () => {
  return (
    <div className="aboutus">
      <Navbar />

      <AddInventory />
      <ShowInv />
      <ChatbotEmbed />
    </div>
  );
};

export default Inventory;
