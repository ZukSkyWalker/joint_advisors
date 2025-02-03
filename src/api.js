// src/api.js

// OpenAI API call
export async function callOpenAI(prompt, openAiKey) {
    const startTime = performance.now();
    
    // We'll assume the user is passing in their personal key each time,
    // or you can store it in a config file or environment variable.
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or whichever model you choose
        messages: [{ role: "user", content: prompt }],
      }),
    });
    
    const endTime = performance.now();
    const responseTime = (endTime - startTime).toFixed(2); // in ms
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "OpenAI API Error");
    }
    
    const data = await response.json();
    // We'll assume the response text is at data.choices[0].message.content
    return {
      text: data.choices?.[0]?.message?.content || "",
      responseTime,
    };
  }
  
  // Local Ollama call
  export async function callOllama(prompt) {
    const startTime = performance.now();
    
    // If your Ollama is running on http://localhost:11411
    // and you want to load the 'deepseek' model:
    // POST /generate
    const response = await fetch("http://localhost:11411/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "deepseek", // or the appropriate model name
      }),
    });
    
    const endTime = performance.now();
    const responseTime = (endTime - startTime).toFixed(2); // in ms
    
    if (!response.ok) {
      throw new Error("Local Ollama Error");
    }
    
    const data = await response.json();
    // The format of the Ollama response may differ, adapt as necessary
    // For Ollama, you often get streaming, but let's assume it's chunked text or a final object.
    const text = data?.[0]?.content || ""; // example usage—adjust to your actual response data
    
    return {
      text,
      responseTime,
    };
  }
  