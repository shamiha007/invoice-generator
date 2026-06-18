# Smart Invoice Generator

A full-stack Invoice Generator web application built using React.js, Vite, Node.js, Express.js, and MySQL. The application enables users to create, preview, save, edit, delete, and download professional invoices through a clean and responsive user interface.

The project has been fully containerized using Docker and Docker Compose, with separate containers for the frontend, backend, and MySQL database. Dockerization ensures consistent development, testing, and deployment environments, making the application easy to set up and run across different systems.

---

## Live Demo

🔗 https://invoice-generator-smoky-six.vercel.app/


# # Live Features

✅ Create Professional Invoices
✅Real-Time Invoice Preview
✅ Save Invoice Data to MySQL Database
✅ Edit Existing Invoices
✅ Delete Saved Invoices
✅ Search & Filter Invoices
✅ Upload Signature Image
✅ Draw Digital Signature
✅ Download Invoices as PDF
✅ Responsive User Interface
✅ Full CRUD Operations
✅ RESTful API Integration
✅ MySQL Database Connectivity
✅ Dockerized Frontend, Backend, and Database Services
✅ Multi-Container Architecture Using Docker Compose
✅ Easy Deployment with Docker Containers
✅ Consistent Development and Production Environment
✅ Containerized MySQL Database with Initialization Scripts
✅ Nginx-Based Frontend Deployment
✅ Cross-Platform Application Setup

---

# Technologies Used

## Frontend
- HTML5
- CSS3
- JavaScript
- React JS
- Vite

## Backend
- Node JS
- Express JS

## Database
- MySQL
- MySQL Workbench

## Docker 
- Docker Desktop

---

## Docker Support

This project has been containerized using Docker and Docker Compose.

### Docker Components

- Frontend Container (React + Vite + Nginx)
- Backend Container (Node.js + Express.js)
- MySQL Container
- Docker Compose for multi-container orchestration

### Docker Files

```text
docker-compose.yml
backend/Dockerfile
frontend/Dockerfile
frontend/nginx.conf
backend/.dockerignore
frontend/.dockerignore
mysql-init/init.sql
```

### Run with Docker

Build the containers:

```bash
docker compose build
```

Start all services:

```bash
docker compose up -d
```

Stop all services:

```bash
docker compose down
```

### Container Ports

| Service | Port |
|----------|--------|
| Frontend | 5173 |
| Backend | 5000 |
| MySQL | 3307 |

# Project Structure

```bash
invoice-generator/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── invoiceController.js
│   │
│   ├── routes/
│   │   └── invoiceRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│   ├── Dockerfile
│   └── .dockerignore
|
|
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── InvoiceForm.jsx
│   │   │   ├── InvoiceList.jsx
│   │   │   ├── InvoicePreview.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── EditInvoice.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
|   ├── Dockerfile
│   ├── nginx.conf
│   └── .dockerignore
|
├── mysql-init/
│   └── init.sql
|
├── docker-compose.yml
├── DEPLOYMENT.md
└── README.md


---

# Screenshots

## Home Page
- Invoice creation form
- Invoice preview section
- Dynamic invoice updates

## Saved Invoices
- Search invoices
- Edit invoice
- Delete invoice

## Signature Features
- Draw signature
- Upload signature image

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/shamiha007/invoice-generator.git
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Database Setup

1. Open MySQL Workbench
2. Create a database

```sql
CREATE DATABASE invoice_db;
```

3. Configure database connection in `.env`

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=invoice_db
```

---

# API Features

- Create Invoice
- Get All Invoices
- Update Invoice
- Delete Invoice

---

# Future Improvements

- User Authentication
- Email Invoice Sending
- Dark Mode
- Multi-Currency Support
- GST Calculation
- Cloud Database Deployment

---

# Author

## Shamiha Sherin

GitHub:  
https://github.com/shamiha007

---
