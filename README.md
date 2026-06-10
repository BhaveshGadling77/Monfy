<div align="center">

# 💰 Monfy — Personal Finance Tracker

**A full-stack web application for managing personal finances. Track expenses, categorize spending, and visualize financial reports — all in one place.**

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-GPL--3.0-blue)

</div>

---

## ✨ Features

### 🔐 Authentication
- Secure user registration and login with **JWT-based authentication**
- Passwords hashed with **bcrypt**
- Protected API routes — users can only access their own data
- Persistent sessions via localStorage

### 📊 Dashboard
- **Time-based greeting** with personalized user name
- At-a-glance stat cards showing **Income**, **Expenses**, and **Balance**
- Animated, staggered entry for a polished feel

### 💸 Expense Management
- **Add**, **edit**, and **delete** expenses with ease
- Each expense has a **title**, **amount**, **category**, and **date**
- Category-based emoji icons for visual clarity
- Inline edit mode with sticky form sidebar

### 📁 Expense Categories
- 8 built-in categories: Food, Transport, Entertainment, Shopping, Utilities, Health, Education, Other
- Each category has its own color and emoji identifier

### 📈 Financial Reports
- **Doughnut Chart** — spending breakdown by category with center total
- **Bar Chart** — weekly spending trends over time
- Toggle between chart types with a segmented control
- Fully interactive tooltips with formatted currency

### 🎨 Premium UI/UX
- Dark glassmorphism design with animated gradient background
- Staggered animations and smooth hover micro-interactions
- Custom scrollbar, loading spinners, and reveal-on-hover action buttons
- Fully responsive layout (mobile, tablet, desktop)
- Inter font for clean, modern typography

---

## 🏗️ Tech Stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Frontend   | React 19, Vite, React Router, Chart.js       |
| Backend    | Node.js, Express.js                          |
| Database   | MongoDB with Mongoose ODM                    |
| Auth       | JSON Web Tokens (JWT), bcryptjs              |
| Styling    | Vanilla CSS (glassmorphism, CSS variables)    |
| Icons      | Lucide React                                 |
| Dates      | date-fns                                     |
| HTTP       | Axios                                        |

---

## 📂 Project Structure

```
Monfy/
├── backend/
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   ├── models/
│   │   ├── User.js            # User schema (name, email, password)
│   │   └── Expense.js         # Expense schema (title, amount, category, date)
│   ├── routes/
│   │   ├── authRoutes.js      # POST /register, POST /login
│   │   └── expenseRoutes.js   # CRUD endpoints for expenses
│   ├── server.js              # Express app entry point
│   ├── .env                   # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chart.jsx      # Doughnut + Bar chart with toggle
│   │   │   ├── ExpenseForm.jsx# Add/Edit expense form
│   │   │   ├── ExpenseList.jsx# Transaction list with actions
│   │   │   └── Navbar.jsx     # Top navigation bar
│   │   ├── context/
│   │   │   └── AuthContext.jsx# Auth state management
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx  # Main dashboard view
│   │   │   ├── Login.jsx      # Login page
│   │   │   └── Register.jsx   # Registration page
│   │   ├── utils/
│   │   │   └── api.js         # Axios instance with auth interceptor
│   │   ├── App.jsx            # Router and route protection
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles and design system
│   ├── index.html
│   └── package.json
│
├── README.md
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **MongoDB** running locally or a cloud URI — [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### 1. Clone the repository

```bash
git clone https://github.com/BhaveshGadling77/Monfy.git
cd Monfy
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file (or edit the existing one):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/monfy
JWT_SECRET=your_secret_key_here
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Set up the frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Reference

All routes are prefixed with `/api`. Protected routes require a `Bearer` token in the `Authorization` header.

### Auth

| Method | Endpoint         | Body                            | Description         |
|--------|------------------|---------------------------------|---------------------|
| POST   | `/api/auth/register` | `{ name, email, password }` | Create a new user   |
| POST   | `/api/auth/login`    | `{ email, password }`       | Login, returns JWT  |

### Expenses (🔒 Protected)

| Method | Endpoint              | Body                                    | Description            |
|--------|-----------------------|-----------------------------------------|------------------------|
| GET    | `/api/expenses`       | —                                       | Get all user expenses  |
| POST   | `/api/expenses`       | `{ title, amount, category, date }`     | Create new expense     |
| PUT    | `/api/expenses/:id`   | `{ title, amount, category, date }`     | Update an expense      |
| DELETE | `/api/expenses/:id`   | —                                       | Delete an expense      |

---

## 🔧 Environment Variables

| Variable     | Description                | Default                               |
|--------------|----------------------------|---------------------------------------|
| `PORT`       | Backend server port        | `5000`                                |
| `MONGO_URI`  | MongoDB connection string  | `mongodb://localhost:27017/monfy`      |
| `JWT_SECRET` | Secret key for JWT signing | *(required — set your own)*           |

---

## 📜 License

This project is licensed under the **GNU General Public License v3.0**. See [LICENSE](./LICENSE) for details.
