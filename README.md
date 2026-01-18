🔐 Overview

AI Security Log Analyzer is a full-stack application designed to simulate cyber-attacks, store security logs, and analyze them using AI.
The system provides real-time monitoring, attack simulation, log visualization, and automated AI-generated risk assessments.

It is built as a learning and portfolio project to demonstrate practical full-stack development skills, including:

Backend API architecture (Node.js + Express)

Database modeling & log storage (MongoDB)

Frontend UI/UX design (React + Material UI)

Real-time data visualization (Recharts)

AI-powered log analysis (OpenAI GPT-5 Mini)

🚀 Features
✅ Attack Simulator

Generate fake cyber-attacks with one click:

Brute-force login attempts

Night-time suspicious logins

Port scanning activity

Burst login failures

Each simulated attack is automatically stored in MongoDB.

🤖 AI-Powered Log Analysis

Select any attack type and send the latest logs to an AI model.
The system returns:

Risk Score (0–100)

Summary of detected patterns

Risk factors

Recommended actions

This helps demonstrate how AI can assist with log interpretation and threat detection.

📊 Dashboard & Real-Time Monitoring

The frontend displays:

Recent logs grouped by attack category

Real-time threat activity graph

AI analysis panel

Clean, modern dashboard layout

🗃️ Tech Stack
Backend

Node.js

Express

MongoDB + Mongoose

OpenAI API

Frontend

React (Vite)

Material UI

Recharts

Custom dashboard layout

🛠️ Installation
1. Clone the repository
git clone https://github.com/maaaxmaxmax/ai-security-log-analyzer.git

2. Install backend dependencies
cd backend
npm install

3. Add required environment variables

Create .env inside /backend:

MONGODB_URI=your_mongo_connection_string
OPENAI_API_KEY=your_api_key

4. Start backend
npm start

5. Install frontend dependencies
cd ../frontend
npm install
npm run dev


The app is now running locally.
Frontend defaults to: http://localhost:5173

Backend defaults to: http://localhost:3001