# 🌱 AgriConnect

AgriConnect is a full-stack web application developed as part of the **TBI Internship Week 4** assignment. The project connects farmers with buyers through a simple marketplace interface and demonstrates frontend-backend integration using React and Express.js.

---

## 📌 Features

### Frontend
- Responsive React + Vite application
- Navigation using React Router
- Farmers Marketplace page
- Dynamic data fetched from backend APIs
- Loading state while fetching data
- Error handling for failed API requests
- Reusable UI components

### Backend
- RESTful API using Express.js
- CRUD operations for farmers
- Search farmers by keyword
- Filter farmers by crop
- Filter farmers by village
- Input validation
- Duplicate farmer detection
- Standardized JSON responses
- Proper HTTP status codes
- CORS enabled for frontend integration

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- CORS
- Nodemon

---

## 📂 Project Structure

```
AgriConnect
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── data
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/PranjalSingh-dev/AgriConnect.git
```

```
cd AgriConnect
```

---

# Backend Setup

```
cd backend
```

Install dependencies

```bash
npm install
```

Run backend

```bash
npm run dev
```

Server runs on

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/farmers` | Get all farmers |
| GET | `/api/farmers/:id` | Get farmer by ID |
| POST | `/api/farmers` | Create a farmer |
| PUT | `/api/farmers/:id` | Update a farmer |
| DELETE | `/api/farmers/:id` | Delete a farmer |
| GET | `/api/farmers/search?q=` | Search farmers |
| GET | `/api/farmers/crop/:crop` | Filter by crop |
| GET | `/api/farmers/village/:village` | Filter by village |

---

# Sample API Response

```json
{
  "success": true,
  "message": "Farmers fetched successfully",
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Rahul Sharma",
      "crop": "Sugarcane",
      "village": "Haldwani"
    }
  ]
}
```

---

# Frontend Integration

The Marketplace page fetches data from:

```
GET http://localhost:5000/api/farmers
```

Features implemented:

- Fetch API
- Loading state
- Error handling
- Dynamic rendering of farmer cards

---

# Screenshots

The project includes:

- Marketplace displaying backend data
- Chrome DevTools Network request (200 OK)
- Postman API testing
- CRUD API responses

---

# Internship Deliverables Completed

- Express Backend
- REST APIs
- CRUD Operations
- Search API
- Crop Filter API
- Village Filter API
- Frontend Integration
- Loading & Error States
- GitHub Repository
- Postman Collection
- Network Request Verification

---

# Future Improvements

- Database integration (MongoDB/MySQL)
- Farmer authentication
- Product listings
- Image uploads
- Buyer dashboard
- Admin panel

---

# Author

**Pranjal Singh**

**TBI Internship Week 4**

**Intern ID:** **TBI-26100412**

GitHub:
https://github.com/PranjalSingh-dev/AgriConnect

---