# Smart Invoice Generator

A full stack invoice generator web application built using React JS, Node JS, Express JS, and MySQL.  
This application allows users to create, preview, save, edit, delete, and download invoices with a clean and responsive user interface.

---

## Live Demo

🔗 https://invoice-generator-smoky-six.vercel.app/


# Live Features

✅ Create Professional Invoices  
✅ Real-Time Invoice Preview  
✅ Save Invoice Data  
✅ Edit Existing Invoices  
✅ Delete Saved Invoices  
✅ Search & Filter Invoices  
✅ Upload Signature Image  
✅ Draw Digital Signature  
✅ Download Invoice as PDF  
✅ Responsive UI Design  
✅ Full CRUD Operations  

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

---

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
│
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
│
└── README.md
```

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
