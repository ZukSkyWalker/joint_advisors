// src/ChatBox.js
import React, { useState } from "react";
import { callOpenAI, callOllama } from "./api";
import "./ChatBox.css";

function ChatBox() {
  const [prompt, setPrompt] = useState("");
  const [openAiResponse, setOpenAiResponse] = useState(null);
  const [ollamaResponse, setOllamaResponse] = useState(null);
  const [openAiError, setOpenAiError] = useState(null);
  const [ollamaError, setOllamaError] = useState(null);

  const [openAiKey, setOpenAiKey] = useState(""); // user-provided API key

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Reset states
    setOpenAiResponse(null);
    setOllamaResponse(null);
    setOpenAiError(null);
    setOllamaError(null);

    try {
      // Call OpenAI
      if (openAiKey) {
        const { text, responseTime } = await callOpenAI(prompt, openAiKey);
        setOpenAiResponse({ text, responseTime });
      } else {
        setOpenAiError("No OpenAI key provided.");
      }

      // Call local Ollama
      const { text, responseTime } = await callOllama(prompt);
      setOllamaResponse({ text, responseTime });
    } catch (err) {
      // Distinguish errors from each call
      if (err.message.includes("OpenAI")) {
        setOpenAiError(err.message);
      } else {
        setOllamaError(err.message);
      }
    }
  };

  return (
    <div className="chat-container">
      <h2>Joint Advisors</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="openAiKey">OpenAI API Key</label>
        <input
          id="openAiKey"
          type="password"
          value={openAiKey}
          onChange={(e) => setOpenAiKey(e.target.value)}
          placeholder="Enter your OpenAI Key"
        />

        <label htmlFor="prompt">Ask a Question</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question here..."
        />

        <button type="submit">Submit</button>
      </form>

      <div className="responses-container">
        <div className="response-box">
          <h3>OpenAI Response</h3>
          {openAiError && <p className="error">Error: {openAiError}</p>}
          {openAiResponse && (
            <>
              <p>{openAiResponse.text}</p>
              <p className="time">Time: {openAiResponse.responseTime} ms</p>
            </>
          )}
        </div>

        <div className="response-box">
          <h3>Ollama (DeepSeek) Response</h3>
          {ollamaError && <p className="error">Error: {ollamaError}</p>}
          {ollamaResponse && (
            <>
              <p>{ollamaResponse.text}</p>
              <p className="time">Time: {ollamaResponse.responseTime} ms</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
