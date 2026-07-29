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
| AI | @google/generative-ai (Gemini 2.5 Flash) |

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


## 👤 Author

Pranjal Singh
TBI Internship   
Intern ID: TBI-26100412
GitHub: [PranjalSingh-dev/AgriConnect](https://github.com/PranjalSingh-dev/AgriConnect)

---

## 🚀 Week 9 — App Deployment & Go-Live

### 🌍 Live URLs

| Service | URL |
|---------|-----|
| **Frontend (Vercel)** | https://agriconnect.vercel.app |
| **Backend (Render)** | https://agriconnect-api.onrender.com |

---

### ☁️ Frontend Deployment — Vercel

**Step-by-step:**

1. Go to [vercel.com](https://vercel.com) → **New Project** → **Import GitHub Repo** → select `AgriConnect`
2. Set **Root Directory** to `frontend`
3. Framework preset will auto-detect **Vite**
4. Add Environment Variable in Vercel dashboard:
   ```
   VITE_API_URL = https://agriconnect-api.onrender.com
   ```
5. Click **Deploy** — Vercel will assign a URL like `agriconnect.vercel.app`
6. The `frontend/vercel.json` file handles SPA routing (prevents 404 on direct page refresh)

---

### 🖥️ Backend Deployment — Render

**Step-by-step:**

1. Go to [render.com](https://render.com) → **New Web Service** → **Connect GitHub** → select `AgriConnect`
2. Set **Root Directory** to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all Environment Variables in Render dashboard:
   ```
   PORT          = 10000
   NODE_ENV      = production
   MONGO_URI     = mongodb+srv://<user>:<pass>@cluster.mongodb.net/agriconnect
   JWT_SECRET    = <your_strong_secret>
   GEMINI_API_KEY = <your_gemini_key>
   CLIENT_URL    = https://agriconnect.vercel.app
   ```
6. Deploy — note the assigned URL like `agriconnect-api.onrender.com`
7. Go back to Vercel → update `VITE_API_URL` to match the Render URL → **Redeploy**

---

### 🛠️ Debugging Common Deployment Issues

| Issue | Fix |
|-------|-----|
| **CORS Error** | Ensure `CLIENT_URL` on Render matches your exact Vercel URL (no trailing slash) |
| **Missing env vars** | Check Render dashboard → Environment tab; check Vercel dashboard → Settings → Environment Variables |
| **Database connection error** | In MongoDB Atlas → Network Access → Add IP `0.0.0.0/0` to whitelist Render's dynamic IPs |
| **OAuth redirect mismatch** | Update authorized redirect URIs in Google Cloud Console to include the production URL |
| **404 on page refresh** | The `frontend/vercel.json` SPA rewrite rule handles this automatically |
| **App slow to respond** | Render free tier spins down after 15 min idle. First request after idle takes ~30–50s to wake up. |

---

### ⚠️ Known Limitations — Free Tier

- **Render cold start**: The backend spins down after 15 minutes of inactivity on the free tier.  
  The first request after idle may take **30–60 seconds** to respond. Subsequent requests are fast.
- **Vercel bandwidth**: Free tier has 100 GB/month bandwidth limit (more than sufficient for a demo app).
- **MongoDB Atlas**: Free tier (M0) has 512 MB storage limit.

---

### ✅ End-to-End Test Checklist

- [ ] All pages load at the Vercel URL
- [ ] Registration works (new account created in MongoDB Atlas)
- [ ] Login works (JWT token returned and stored)
- [ ] Farmer CRUD operations persist (data visible in Atlas)
- [ ] AI Crop Advisor returns diagnosis from Gemini API
- [ ] Google OAuth simulation login completes and redirects correctly
- [ ] Dashboard shows only the logged-in user's listings

---


- SPA routing 404 on Vercel — solved with `vercel.json` rewrite rule
- Render free-tier cold starts — documented as known limitation

**Outcome:** AgriConnect is fully prepared for production deployment on Vercel + Render with zero hardcoded URLs, proper CORS handling, and complete documentation.
