# MailFlow | Secure Email Service API

<p align="center">
  <img src="img/logo.png" alt="MailFlow Logo" width="120"/>
</p>

## 🚀 Overview
MailFlow is a full-stack **RESTful API** service built to handle secure email dispatching. Developed as a production-ready solution, it integrates a **Node.js/Express** backend with **MongoDB Atlas** for data persistence and **Nodemailer** for SMTP communication.

## 🛠️ Technical Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Security:** JSON Web Tokens (JWT), Bcrypt.js (Password Hashing)
* **Frontend:** Tailwind CSS, HTML5
* **Deployment Ready:** Environment variable configuration for secure secrets management.

## 🔑 Key Features
* **JWT Authentication:** Custom middleware to protect API routes, ensuring only authorized users can dispatch emails.
* **Secure Data Handling:** Industry-standard password hashing using Bcrypt.js to ensure user privacy.
* **Activity Logging:** Real-time tracking of email transactions stored in a centralized MongoDB database.
* **Responsive Dashboard:** A clean, modern UI for monitoring service status and delivery logs.

## 📂 Project Structure

```text
├── models/           # Mongoose schemas
├── routes/           # API endpoints (Auth, Mail)
├── middleware/       # JWT validation logic
├── public/           # Frontend assets (HTML, CSS, img/logo.png)
├── .env.example      # Configuration template (Secrets hidden)
└── server.js         # Entry point