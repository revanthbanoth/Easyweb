![![alt text](image-1.png)](image.png)<div align="center">

# ⚡ EasyWeb

### Premium Website Selling Platform

**Launch your business website in 24 hours.**  
Ready-made websites for clinics, gyms, restaurants & small businesses.

[![Node.js](https://img.shields.io/badge/Node.js-v22-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-v19-blue?style=flat-square&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/NeonDB-PostgreSQL-4169e1?style=flat-square&logo=postgresql)](https://neon.tech)

</div>

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Pages & Features](#pages--features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

---

## 🚀 About the Project

**EasyWeb** is a full-stack SaaS-style website selling platform where businesses can browse premium website templates, view live demos, and place orders that get saved directly to a PostgreSQL (NeonDB) database.

**Key highlights:**
- 🎨 Premium dark-themed UI with glassmorphism cards & neon accents
- ⚡ Framer Motion animations on every page
- 🗄️ NeonDB (PostgreSQL) with auto table creation on server start
- 📦 8 industry-specific templates pre-seeded out of the box
- 🛠️ Admin dashboard to manage orders and update statuses
- 📱 Fully responsive on all screen sizes

---

## 🛠️ Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 19, Vite 7, TailwindCSS 3         |
| Animations | Framer Motion                           |
| HTTP Client| Axios                                   |
| Routing    | React Router DOM v6                     |
| Backend    | Node.js, Express.js                     |
| Database   | NeonDB (PostgreSQL) via `pg` library    |
| Icons      | Lucide React                            |
| Fonts      | Inter + Outfit (Google Fonts)           |

---

## 📁 Project Structure

```
Easyweb/
├── backend/
│   ├── controllers/
│   │   ├── templateController.js   # GET all templates, GET by ID
│   │   └── orderController.js      # POST order, GET all orders, PUT status
│   ├── routes/
│   │   ├── templateRoutes.js       # /api/templates
│   │   └── orderRoutes.js          # /api/orders
│   ├── db/
│   │   └── index.js                # NeonDB pool + auto table init + seeding
│   ├── server.js                   # Express entry point
│   ├── .env                        # DATABASE_URL, PORT
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Glassmorphism sticky navbar
│   │   │   ├── Footer.jsx          # Footer with links & socials
│   │   │   └── TemplateCard.jsx    # Template card with hover animations
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Hero, features, templates, testimonials, CTA
│   │   │   ├── Templates.jsx       # Searchable, filterable template grid
│   │   │   ├── TemplateDetail.jsx  # Single template detail + buy button
│   │   │   ├── Order.jsx           # Order form + live summary sidebar
│   │   │   ├── Admin.jsx           # Admin dashboard with stats & order table
│   │   │   └── Contact.jsx         # Contact form + FAQ accordion
│   │   ├── services/
│   │   │   └── api.js              # Axios API service layer
│   │   ├── App.jsx                 # Router + page transitions
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles + Tailwind base
│   ├── tailwind.config.js          # Custom color palette & animations
│   ├── vite.config.js              # Vite config with dev proxy
│   ├── .env                        # VITE_API_URL
│   └── package.json
│
├── .vscode/
│   └── settings.json               # Suppresses Tailwind CSS lint errors
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema

All tables are **automatically created** when the backend starts using `CREATE TABLE IF NOT EXISTS`.

### `users`
| Column       | Type          | Notes              |
|--------------|---------------|--------------------|
| `id`         | SERIAL PK     | Auto-increment     |
| `name`       | VARCHAR(255)  | Required           |
| `email`      | VARCHAR(255)  | Unique, Required   |
| `phone`      | VARCHAR(20)   | Optional           |
| `created_at` | TIMESTAMP     | Default: NOW()     |

### `website_templates`
| Column          | Type           | Notes          |
|-----------------|----------------|----------------|
| `id`            | SERIAL PK      | Auto-increment |
| `title`         | VARCHAR(255)   | Required       |
| `category`      | VARCHAR(100)   | Required       |
| `description`   | TEXT           |                |
| `price`         | DECIMAL(10,2)  | Required       |
| `preview_image` | TEXT           | Image URL      |
| `demo_url`      | TEXT           | Live demo URL  |
| `created_at`    | TIMESTAMP      | Default: NOW() |

### `orders`
| Column              | Type         | Notes                     |
|---------------------|--------------|---------------------------|
| `id`                | SERIAL PK    | Auto-increment            |
| `user_id`           | INTEGER FK   | References `users(id)`    |
| `template_id`       | INTEGER FK   | References `website_templates(id)` |
| `business_name`     | VARCHAR(255) |                           |
| `business_category` | VARCHAR(100) |                           |
| `phone`             | VARCHAR(20)  |                           |
| `email`             | VARCHAR(255) |                           |
| `order_status`      | VARCHAR(50)  | Default: `'pending'`      |
| `created_at`        | TIMESTAMP    | Default: NOW()            |

### `payments`
| Column           | Type          | Notes                   |
|------------------|---------------|-------------------------|
| `id`             | SERIAL PK     | Auto-increment          |
| `order_id`       | INTEGER FK    | References `orders(id)` |
| `amount`         | DECIMAL(10,2) |                         |
| `payment_status` | VARCHAR(50)   | Default: `'pending'`    |
| `created_at`     | TIMESTAMP     | Default: NOW()          |

> **Auto-seeded Templates:** On first startup, 8 sample templates are inserted automatically:
> MedCare Pro, FitZone Elite, Savoria Restaurant, LegalEdge Law, BeautyBliss Salon, EduLearn Academy, TechStart Agency, RealEstate Pro.

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint              | Description                        | Auth     |
|--------|-----------------------|------------------------------------|----------|
| `GET`  | `/health`             | Server health check                | Public   |
| `GET`  | `/templates`          | Get all website templates          | Public   |
| `GET`  | `/templates/:id`      | Get a single template by ID        | Public   |
| `POST` | `/orders`             | Place a new order                  | Public   |
| `GET`  | `/orders`             | Get all orders (admin)             | Admin    |
| `PUT`  | `/orders/:id`         | Update order status                | Admin    |

### POST `/api/orders` — Request Body
```json
{
  "name": "Dr. Priya Sharma",
  "business_name": "Sharma Dental Clinic",
  "email": "priya@clinic.com",
  "phone": "+91 98765 43210",
  "business_category": "Healthcare / Clinic",
  "template_id": 1
}
```

### PUT `/api/orders/:id` — Request Body
```json
{
  "order_status": "in_progress"
}
```
Valid statuses: `pending` | `in_progress` | `completed` | `cancelled`

---

## 📄 Pages & Features

| Route               | Page              | Features                                                    |
|---------------------|-------------------|-------------------------------------------------------------|
| `/`                 | Home              | Animated hero, stats, features grid, templates, testimonials, CTA |
| `/templates`        | Templates         | Search bar, category filter, sort by price/name, animated grid |
| `/templates/:id`    | Template Detail   | Large preview, features checklist, price, buy button        |
| `/order`            | Order Form        | Full form, live order summary sidebar, success animation    |
| `/admin`            | Admin Dashboard   | Stat cards, full orders table, inline status dropdowns      |
| `/contact`          | Contact           | Contact form, info cards, animated FAQ accordion            |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18 or above
- npm v9 or above
- A NeonDB (or any PostgreSQL) database

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/easyweb.git
cd easyweb
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
DATABASE_URL=your_neondb_connection_string
PORT=5000
```

Start the backend server:
```bash
node server.js
```

> ✅ Database tables are created and sample data is seeded **automatically** on first run.

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` folder:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend dev server:
```bash
npm run dev
```

### 4. Open in Browser
```
Frontend → http://localhost:5173
Backend  → http://localhost:5000
API Docs → http://localhost:5000/api/health
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
| Variable       | Description                         | Example                        |
|----------------|-------------------------------------|--------------------------------|
| `DATABASE_URL` | Full NeonDB PostgreSQL connection   | `postgresql://user:pass@...`   |
| `PORT`         | Port for the Express server         | `5000`                         |
| `FRONTEND_URL` | Frontend URL for CORS (production)  | `https://easyweb.vercel.app`   |

### Frontend (`frontend/.env`)
| Variable        | Description                    | Example                          |
|-----------------|--------------------------------|----------------------------------|
| `VITE_API_URL`  | Backend API base URL           | `http://localhost:5000`          |

---

## 🚀 Deployment

### Frontend → Vercel

1. Push the `frontend/` folder to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Set environment variable:
   ```
   VITE_API_URL = https://your-backend.onrender.com
   ```
4. Deploy ✅

### Backend → Render

1. Push the `backend/` folder to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Add environment variables:
   ```
   DATABASE_URL = your_neondb_connection_string
   FRONTEND_URL = https://your-frontend.vercel.app
   PORT         = 5000
   ```
5. Deploy ✅

### 🔄 Uptime Monitoring (UptimeRobot)

To prevent the Render backend from sleeping, we have provided a `/health` endpoint to be pinged by UptimeRobot every 5 minutes.

1. Create account on https://uptimerobot.com
2. Add new monitor
3. Monitor type: HTTP
4. URL: https://your-backend-domain/health
5. Monitoring interval: 5 minutes

### Database → NeonDB

NeonDB is already configured. Tables are created automatically on the first server start.
- Dashboard: [console.neon.tech](https://console.neon.tech)

---

## 🎨 Design System

| Token          | Value                          |
|----------------|-------------------------------|
| Background     | `#030712`                     |
| Surface        | `rgba(255,255,255,0.05)` (glass) |
| Primary        | `#6366f1` (indigo)            |
| Accent         | `#00d4ff` (neon blue)         |
| Text Primary   | `#ffffff`                     |
| Text Secondary | `#9ca3af`                     |
| Font (Body)    | Inter                         |
| Font (Headings)| Outfit                        |

---

## 📜 License

This project is licensed under the **MIT License**.

---

<div align="center">

Built with ❤️ by the EasyWeb team · [Contact Us](mailto:hello@easyweb.com)

</div>
