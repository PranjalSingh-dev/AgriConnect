# 🌱 AgriConnect

AgriConnect is a full-stack web application developed as part of the **TBI Internship (Weeks 4–7)** assignment. It connects farmers with buyers through a marketplace interface and now features an **AI-Powered Crop Advisor** backed by the **Google Gemini API**.

---

## 📌 Features

### Frontend
- Responsive React + Vite application
- Navigation using React Router
- Farmers Marketplace page with search & crop filters
- Dynamic data fetched from MongoDB-backed APIs
- Loading state while fetching data
- Error handling for failed API requests
- Reusable UI components
- **User Registration & Login (JWT auth)**
- **Google OAuth (interactive simulation)**
- **Protected Routes** — Dashboard and Farmer CRUD pages require login
- **User Dashboard** — view, add, edit, delete your own farmer listings
- **🤖 AI Crop Advisor** — Diagnose diseases and get treatment advice using Google Gemini

### Backend
- RESTful API using Express.js
- **MongoDB + Mongoose** for persistent data storage
- CRUD operations for farmers (protected by JWT)
- Search farmers by keyword, crop, and village
- **Zod** input validation, **bcryptjs** password hashing, **JWT** auth
- Rate limiting on auth endpoints
- CORS enabled for frontend integration
- **🤖 Google Gemini AI integration** — `POST /api/ai/crop-advice`
- API key stored securely in `.env` (never committed to git)

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Vite, React Router DOM, Tailwind CSS |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Auth | bcryptjs, JWT, express-rate-limit |
| Validation | Zod |
| AI | **@google/generative-ai** (Gemini 2.5 Flash) |

---

## 📂 Project Structure

```
AgriConnect/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── ui/
│       └── pages/
│           ├── Home.jsx
│           ├── Login.jsx
│           ├── Marketplace.jsx
│           ├── About.jsx
│           ├── Dashboard.jsx
│           ├── AddFarmer.jsx
│           └── AIAssistant.jsx        
│
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── farmerController.js
│   │   ├── authController.js
│   │   └── ai.controller.js           
│   ├── middleware/
│   ├── models/ (Farmer.js, User.js)
│   ├── routes/
│   │   ├── farmerRoutes.js
│   │   ├── authRoutes.js
│   │   └── ai.routes.js               
│   ├── services/
│   │   └── gemini.service.js          
│   ├── .env                          
│   ├── .env.example
│   └── server.js
│
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (running locally on port 27017)
- Google Gemini API Key — get a free key at [aistudio.google.com](https://aistudio.google.com/apikey)

### Clone

```bash
git clone https://github.com/PranjalSingh-dev/AgriConnect.git
cd AgriConnect
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/agriconnect
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Never commit your `.env` file.** It is in `.gitignore`.

```bash
npm run dev
# Server: http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# App: http://localhost:5173
```

---

## 🤖 AI Feature — Crop Advisor

### Endpoint

```
POST /api/ai/crop-advice
```

### Request

```json
{
  "crop": "Tomato",
  "symptoms": "Leaves turning yellow with brown spots"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "disease": "Early Blight (Fungal)",
    "cause": "Fungal infection (Alternaria solani) favored by warm, humid conditions",
    "treatment": "Apply Copper Fungicide or Neem Oil spray. Remove affected lower leaves.",
    "prevention": "Avoid overhead watering. Rotate crops yearly."
  }
}
```

### How it works
1. Farmer enters **crop name** + **symptoms** in the AI Advisor page
2. Frontend sends `POST /api/ai/crop-advice` to backend
3. Backend calls **Google Gemini 2.5 Flash** with a structured JSON prompt
4. Gemini returns diagnosis as JSON (disease, cause, treatment, prevention)
5. Frontend renders results in beautifully styled cards
6. If Gemini fails, falls back to intelligent mock diagnosis

---

## 🔌 All API Endpoints

### AI (Week 7)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/ai/crop-advice` | None | AI crop diagnosis via Gemini |

### Farmers
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/farmers` | None | Get all farmers |
| GET | `/api/farmers/:id` | None | Get farmer by ID |
| GET | `/api/farmers/search?q=` | None | Search farmers |
| GET | `/api/farmers/crop/:crop` | None | Filter by crop |
| GET | `/api/farmers/village/:village` | None | Filter by village |
| POST | `/api/farmers` | JWT | Create farmer |
| PUT | `/api/farmers/:id` | JWT | Update farmer |
| DELETE | `/api/farmers/:id` | JWT | Delete farmer |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/google` | Google OAuth |

---

## ✅ Internship Deliverables

### Week 4 — REST API & Frontend Integration
- Express backend, REST APIs, CRUD, search & filter, React frontend

### Week 5 — Database Design
- MongoDB + Mongoose, schema validation, database seeding

### Week 6 — Authentication & Security
- JWT auth, bcrypt, Zod validation, protected routes, rate limiting

### Week 7 — AI Feature Integration ⭐
- ✅ Google Gemini 2.5 Flash API integrated in backend
- ✅ Dedicated endpoint `POST /api/ai/crop-advice`
- ✅ Frontend AI Advisor form with input fields and structured output cards
- ✅ Loading spinner while AI generates response
- ✅ Error handling with user-friendly messages and mock fallback
- ✅ API key secured in `.env` (not committed)
- ✅ `PROMPTS.md` — 3 prompt variations, example I/O, best prompt analysis
- ✅ `W7_AIFeatureDemo_TBI-26100412.pdf` — 4 demo screenshots

---

## 📝 Weekly Progress Report — Week 7

This week I implemented an AI-Powered Crop Advisor using the Google Gemini 2.5 Flash API.

**Features:**
- ✔ Backend Gemini API integration (`services/gemini.service.js`)
- ✔ Dedicated REST endpoint (`POST /api/ai/crop-advice`)
- ✔ Frontend AI Advisor UI (`pages/AIAssistant.jsx`)
- ✔ Loading state — spinner with "Loading..." text
- ✔ Error handling — user-friendly messages
- ✔ API key secured in `.env`
- ✔ Prompt engineering — structured JSON output for consistent UI

**Challenges:**
- Gemini 1.5 Flash was retired → switched to `gemini-2.5-flash`
- CORS errors on port 5174 → added to allowed origins list
- Gemini wrapping JSON in markdown → added cleanup logic

**Outcome:** Farmers can now type a crop name and describe symptoms to get an instant, AI-generated diagnosis with treatment and prevention advice.

---

## 👤 Author

Pranjal Singh
TBI Internship   
Intern ID: TBI-26100412
GitHub: [PranjalSingh-dev/AgriConnect](https://github.com/PranjalSingh-dev/AgriConnect)
