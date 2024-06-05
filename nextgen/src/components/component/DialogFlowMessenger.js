"use client";
// components/DialogflowMessenger.js

import { useEffect } from "react";

const DialogflowMessenger = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <df-messenger
        project-id="peppy-apparatus-424717-p6"
        agent-id="9d0e71f1-8c68-4b70-97b6-7ae8fc43affc"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title=""></df-messenger-chat-bubble>
      </df-messenger>
      <style jsx global>{`
        df-messenger {
          z-index: 999;
          position: fixed;
          --df-messenger-font-color: #000;
          --df-messenger-font-family: Google Sans;
          --df-messenger-chat-background: #f3f6fc;
          --df-messenger-message-user-background: #d3e3fd;
          --df-messenger-message-bot-background: #fff;
          bottom: 16px;
          right: 16px;
        }
      `}</style>
    </>
  );
};

export default DialogflowMessenger;
