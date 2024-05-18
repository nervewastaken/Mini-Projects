// ChatbotEmbed.js
import React, { useEffect } from "react";

const ChatbotEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="webchat-container"></div>;
};

export default ChatbotEmbed;
