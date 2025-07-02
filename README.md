# 💬 Code Assistant Chatbot

A full-stack AI-powered chatbot that answers coding questions using Together AI.  
Built with **Next.js (frontend)** and **FastAPI (backend)**.

---

## 🖥️ Tech Stack

- **Frontend**: Next.js, Material UI, TypeScript  
- **Backend**: FastAPI, Python  
- **AI Provider**: Together AI API  

---

## 📁 Project Structure (High-Level)

```
ChatBot/
├── backend/      # FastAPI backend server
├── client/       # Next.js frontend application
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ChatBot.git
cd ChatBot
```

---

### 2. Backend Setup (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### ➕ Create `.env` file in `/backend`

```
TOGETHER_API_KEY=your_together_ai_api_key
```

> ⚠️ **Note**: Get your API key from [https://www.together.ai](https://www.together.ai)

#### ▶️ Start the backend server

```bash
uvicorn app.main:app --reload
```

Backend running at: [http://localhost:8000](http://localhost:8000)

---

### 3. Frontend Setup (Next.js)

```bash
cd ../client
npm install
npm run dev
```

Frontend running at: [http://localhost:3000](http://localhost:3000)

---

## ✅ Features

- 🧠 Ask coding questions via chat UI
- 🤖 Backend powered by Together AI LLMs
- ✨ Clean and responsive Material UI interface
