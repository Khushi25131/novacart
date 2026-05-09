# NovaCart – Full Stack E-Commerce Application

NovaCart is a modern full-stack e-commerce web application built using the MERN stack.  
It includes product listing, authentication, cart management, protected routes, and MongoDB integration.

---

# Tech Stack

## Frontend
- React.js
- Vite
- TypeScript
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

# Features

- User Authentication (JWT)
- Product Listing
- Product Details Page
- Add to Cart
- Protected Routes
- Redux State Management
- MongoDB Database Integration
- REST API Architecture
- Responsive UI

---

# Folder Structure

```bash
novacart/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── seed/
│   └── server.js
│
└── README.md
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/novacart.git
```

---

## 2. Navigate to Project

```bash
cd novacart
```

---

# Backend Setup

## 1. Go to Server Folder

```bash
cd server
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create `.env` File

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## 4. Start Backend Server

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## 1. Open New Terminal

```bash
cd client
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# MongoDB Setup

1. Create MongoDB Atlas Cluster
2. Create Database User
3. Add IP Address:
   - `0.0.0.0/0`
4. Copy Connection String
5. Paste in `.env`

---

# Seed Products

Run the following command inside the server folder:

```bash
node seed/seedProducts.js
```

This will add products to MongoDB database.

---

# API Routes

## Product Routes

```bash
GET /api/products
GET /api/products/:id
```

## Authentication Routes

```bash
POST /api/users/register
POST /api/users/login
```

## Cart Routes

```bash
POST /api/cart
GET /api/cart
```

---

# Environment Variables

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

---

# Screenshots

Add your project screenshots here.

Example:

```md
![Home Page](./screenshots/home.png)
```

---

# Future Improvements

- Razorpay Payment Integration
- Order Management
- Wishlist
- Admin Dashboard
- Product Search & Filters
- Image Uploads using Cloudinary

---

# Author

Khushi Kumari

---

# License

This project is created for learning and internship demonstration purposes.
