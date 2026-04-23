import { useState } from "react";
import MessageBubble from "./MessageBubble";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you?" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    // add user message
    setMessages((prev) => [...prev, userMessage]);

    // temporary bot reply
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: "Thinking...",
      };

      setMessages((prev) => [...prev, botReply]);
    }, 500);

    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px",
          backgroundColor: "#2563eb",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        AI Assistant
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          backgroundColor: "#f9fafb",
        }}
      >
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #ddd",
          padding: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <button
          onClick={handleSend}
          style={{
            marginLeft: "8px",
            padding: "8px 12px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;