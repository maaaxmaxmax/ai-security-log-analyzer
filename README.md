🔐 AI Security Log Analyzer

An interactive dashboard that simulates cyberattacks, stores security logs, analyzes them with AI, and visualizes activity in real time.
Designed as a portfolio project to demonstrate full-stack development, cybersecurity concepts, and AI integration.

📌 What the Application Does
🔥 Attack Simulator

The system lets you generate different types of simulated cyberattacks with one click:

Brute Force Login Attempts

Night-Time Login Events

Port Scanning Activity

Burst Login Failures

Each attack generates multiple log entries that are automatically saved in MongoDB.

🤖 AI-Powered Log Analysis

The application uses the OpenAI API (GPT-5-mini) to analyze log batches and return:

Risk score

Attack summary

Risk factors

Recommended actions

This demonstrates how AI can be used for automated threat assessment in modern security monitoring.

📊 Real-Time Monitoring Dashboard

The React dashboard provides:

A real-time threat graph updating every second

A Security Log Overview dynamically refreshed

A dedicated AI Analysis panel

A clean UI built with Material UI and responsive layouting

🧰 Tech Stack
Backend

Node.js

Express

MongoDB + Mongoose

OpenAI API

Dotenv

Frontend

React (Vite)

Material UI

Recharts

Modular component-based architecture

🚀 Installation & Setup
1. Clone the repository
git clone https://github.com/maaaxmaxmax/ai-security-log-analyzer.git

2. Install backend dependencies
cd backend
npm install

3. Create .env in the backend folder
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key

4. Start the backend
npm start

5. Set up the frontend
cd ../frontend
npm install
npm run dev


Frontend available at: http://localhost:5173
Backend available at: http://localhost:3001

🎯 Project Purpose

This project was developed to demonstrate:

Full-stack application design

Real-time data handling

Secure logging practices

AI-driven threat analysis

Dashboard UX for cybersecurity monitoring

It can be used for learning, portfolio presentation, or as a prototype for future expansion.

📈 Future Improvements

Potential enhancements include:

User authentication and roles

Email or push notifications on detected threats

Import of real server logs (SSH, Apache, Windows Event Logs)

More detailed threat models

Exporting analysis reports

Dark/light theme toggle

Containerization (Docker)