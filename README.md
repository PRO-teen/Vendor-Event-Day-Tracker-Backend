🧩 Vendor Event Day Tracker – Backend

This backend powers the Vendor Event Day Tracker, handling vendor authentication, event lifecycle, photo uploads, OTP verification, and event completion.

Built with Node.js, Express, MongoDB, following a real-world event workflow.

🔧 Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

Multer – image uploads

CORS – cross-origin support

dotenv – environment variables

📌 Core Responsibilities

The backend handles:

Mock vendor authentication

Vendor check-in with photo & geo-location

OTP-based event start

Event setup progress (pre & post photos)

OTP-based event completion

Secure frontend-backend communication via CORS

🔄 Event Workflow (Backend Logic)
Vendor Login
   ↓
Check-In (photo + latitude/longitude)
   ↓
Start OTP generated
   ↓
OTP verified → Event STARTED
   ↓
Pre-setup & Post-setup uploads
   ↓
Final OTP generated
   ↓
OTP verified → Event COMPLETED

🗂️ Project Structure
server/
│
├── config/
│   └── db.js              # MongoDB connection
│
├── models/
│   ├── Vendor.js          # Vendor schema
│   └── Event.js           # Event schema & states
│
├── routes/
│   ├── authRoutes.js      # Vendor login
│   └── eventRoutes.js     # Event lifecycle APIs
│
├── uploads/               # Uploaded images
│
├── index.js               # App entry point
└── .env                   # Environment variables

🔐 Environment Variables (.env)

Create a .env file inside server/:

 PORT=5000

 MONGO_URI=your_mongodb_connection_string

 FRONTEND_URL=http://localhost:5173

Explanation:

PORT → Server port

MONGO_URI → MongoDB connection string

FRONTEND_URL → Allowed frontend origin (used in CORS)


🌐 CORS Configuration

Backend allows requests only from the frontend URL defined in .env.

This is required for:

Local development

Production deployment

Browser security compliance

📌 OTP is mocked and returned in API response for frontend display.

🖼️ Image Upload Handling

Images are uploaded using Multer

Stored locally in /uploads

File paths are saved in MongoDB

🚀 Running Backend Locally
 cd server
 
 npm install

 npm run dev


Server runs on:

# http://localhost:5000