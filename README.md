# Joint Advisors

A simple React-based chat application that takes a user prompt and:
1. Sends it to OpenAI (using the user’s provided API key).
2. Sends it to a local [Ollama](https://github.com/jmorganca/ollama) server running the **DeepSeek** model.

It then displays both responses side by side, along with their response times.

---

## Features

- **Two-Source Answers**: Get answers from both OpenAI and a local Ollama server.
- **Clean UI**: Minimal styling for straightforward readability.
- **Response Time**: Displays the time (in milliseconds) each request took to complete.

---

## Prerequisites

1. **Node.js** (v14+ recommended) and **npm** or **yarn** to run the React application.
2. An installed and running **Ollama** server, preferably on `http://localhost:11411`, loading the **DeepSeek** model.
3. A valid **OpenAI API key** if you want to see OpenAI responses.

---

## Project Structure
```
joint_advisors
├── README.md
├── server
│   └── localApi.js          // (Optional) server code to proxy calls to Ollama
├── src
│   ├── App.js               // Main React component
│   ├── index.js             // React entry point
│   ├── api.js               // Functions for calling OpenAI/local Ollama
│   ├── ChatBox.css          // Minimal styling
│   └── ChatBox.js           // Chat UI component
├── package.json
└── .gitignore

```

## Setup Instructions
1. Clone the repository:
```
git clone https://github.com/<your-account>/joint_advisors.git
cd joint_advisors
```

2. Install dependencies:
```
npm install
```

3. 