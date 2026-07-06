# Mirror Academy — Codebase Guide

## Overview

A full-stack education institute website (Mirror Academy / PI Academy) for competitive entrance exam preparation in Nepal.

- **Frontend:** React 19 + Vite 6 + Tailwind CSS v4
- **Backend:** Express 5 + PostgreSQL (Sequelize ORM v6)
- **Auth:** Google OAuth via Passport.js (session-based, using `connect-pg-simple`)
- **Deployment:** Vercel (both frontend and backend)

---

## Repo Layout

```
Institute/
├── docs/
│   └── GUIDE.md                       # This file
├── backend/                           # Express API server
│   ├── Server.js                      # Entry point (CORS, session, passport, routes)
│   ├── seed.js                        # Database seeder
│   ├── .env                           # Environment config
│   ├── vercel.json                    # Vercel deployment config
│   ├── package.json
│   ├── Middleware/
│   │   └── adminAuth.js               # isAdmin middleware (created during admin separation)
│   ├── Db/
│   │   ├── db.js                      # Sequelize connection + sync
│   │   └── env.js                     # Config loader
│   ├── Model/
│   │   ├── index.js                   # Barrel file with ALL associations
│   │   ├── User.model.js              # Google OAuth user
│   │   ├── Course.model.js            # Course listing
│   │   ├── Contact.model.js           # Contact form submissions
│   │   ├── Mock.model.js              # Mock test results
│   │   ├── Notice.model.js            # Notices
│   │   ├── PaymentReceipt.model.js    # Payment receipts
│   │   └── ContentBlock.model.js      # Dynamic content blocks (created during admin separation)
│   ├── Controller/
│   │   ├── Auth.controller.js         # Google OAuth handlers
│   │   ├── course.controller.js       # Course CRUD
│   │   ├── Contact.controller.js      # Contact form
│   │   ├── Mock.controller.js         # Mock CRUD
│   │   ├── Notice.controller.js       # Notice CRUD
│   │   ├── PaymentReceipt.controller.js # Payment receipt handling
│   │   └── Content.controller.js      # Dynamic content management
│   └── Routes/
│       ├── Auth.route.js              # /auth/*
│       ├── Course.route.js            # /api/course/*
│       ├── Contact.route.js           # /api/contact/*
│       ├── Mock.route.js              # /api/mock/*
│       ├── Notice.route.js            # /api/notice/*
│       ├── PaymentReceipt.route.js    # /api/payment/*
│       └── Content.route.js           # /api/content/*
├── frontend/                          # Public-facing React SPA
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js                 # Proxy /api + /auth → localhost:5001
│   ├── .env                           # Frontend env vars
│   ├── vercel.json                    # SPA rewrites
│   ├── eslint.config.js               # ESLint flat config
│   ├── public/                        # Static assets (images, icons)
│   └── src/
│       ├── main.jsx                   # Entry, React Router, Redux Provider
│       ├── App.jsx                    # Root layout (Nav, Outlet, Footer, etc.)
│       ├── index.css                  # Tailwind v4 import + theme colors
│       ├── config/
│       │   ├── api.js                 # Axios instance (withCredentials: true)
│       │   └── site.js                # ALL text content (hero, about, etc.)
│       ├── context/
│       │   └── ContentContext.jsx     # Fetches dynamic content from API
│       ├── Redux/
│       │   ├── Store.js               # Redux Toolkit store
│       │   ├── Auth/AuthSlice.js      # User auth state
│       │   └── Sidebar/Sidebarslice.js # Mobile sidebar toggle
│       ├── Components/
│       │   ├── Nav.jsx                # Responsive nav
│       │   ├── Footer.jsx             # Footer
│       │   ├── ScrollToTop.jsx        # Scroll on route change
│       │   ├── Whatsapp.jsx           # Floating WhatsApp button
│       │   └── ProtectedRoutes.jsx    # RequireAuth wrapper
│       ├── Home/About/Contact/Course/Mock/Notice/Profile/
│       │   └── *.jsx                  # Page components
│       └── Home/style.css             # Home-specific styles
├── admin/                             # Admin Dashboard (separate Vite + React app)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js                 # Port 5174, proxy → localhost:5001
│   └── src/
│       ├── main.jsx                   # Entry + React Router
│       ├── App.jsx                    # Layout (Sidebar, Header, Outlet)
│       ├── index.css                  # Tailwind v4
│       ├── config/api.js              # Axios instance
│       ├── context/AuthContext.jsx     # Auth state
│       ├── components/
│       │   ├── Sidebar.jsx            # Navigation sidebar
│       │   ├── AdminRoute.jsx         # isAdmin guard
│       │   └── ImageUpload.jsx        # Cloudinary upload
│       └── pages/
│           ├── Login.jsx              # Google OAuth link
│           ├── Dashboard.jsx          # Summary cards
│           ├── CourseList.jsx         # Course table
│           ├── CourseForm.jsx         # Create/Edit course
│           ├── NoticeList.jsx         # Notice table
│           ├── NoticeForm.jsx         # Create notice
│           ├── MockList.jsx           # Mock table
│           ├── MockForm.jsx           # Create mock
│           ├── Payments.jsx           # Verify receipts
│           ├── Contacts.jsx           # View contact submissions
│           └── ContentEditor.jsx      # Edit site content
```

---

## Architecture

### Backend (MVC)

```
Server.js
  ├── CORS (origin whitelist)
  ├── express.json()
  ├── express-session (PostgreSQL store)
  ├── passport (Google OAuth Strategy)
  ├── Route mounting:
  │   ├── /auth/*         → Auth.route.js     → Auth.controller.js
  │   ├── /api/course/*   → Course.route.js   → course.controller.js
  │   ├── /api/contact/*  → Contact.route.js  → Contact.controller.js
  │   ├── /api/mock/*     → Mock.route.js     → Mock.controller.js
  │   ├── /api/notice/*   → Notice.route.js   → Notice.controller.js
  │   ├── /api/payment/*  → PaymentReceipt.route.js → PaymentReceipt.controller.js
  │   └── /api/content/*  → Content.route.js  → Content.controller.js
  └── startServer() → connectDB() + sequelize.sync()
```

### Frontend (SPA)

```
main.jsx
  ├── Redux Provider (store: auth + sidebar)
  └── RouterProvider
      └── App.jsx (layout)
          ├── ContentProvider (fetches dynamic content)
          ├── ScrollToTop
          ├── Nav
          ├── <Outlet /> (page components)
          ├── Whatsapp
          └── Footer
```

### Admin Dashboard (Separate SPA)

```
main.jsx
  └── RouterProvider
      └── App.jsx (layout)
          ├── AuthContext (checks /auth/user)
          ├── Sidebar
          ├── <Outlet /> (admin pages)
          └── AdminRoute (isAdmin guard)
```

---

## Data Models

### User
| Field | Type | Notes |
|---|---|---|
| `id` | INTEGER PK | Auto-increment |
| `googleId` | STRING, unique | Google profile ID |
| `displayName` | STRING | |
| `email` | STRING | |
| `photo` | STRING | Google profile photo |
| `contact` | STRING | Phone (editable) |
| `isAdmin` | BOOLEAN, default: false | Set by email match on login |

### Course
| Field | Type | Notes |
|---|---|---|
| `id` | INTEGER PK | |
| `title` | STRING | Used as URL param |
| `description` | TEXT | |
| `image` | STRING | |
| `oldPrice` | FLOAT | |
| `newPrice` | FLOAT | |
| `discount` | STRING | e.g. "38%" |
| `features` | JSONB | Array of `{icon, text}` |
| `subjects` | JSONB | Array of strings |
| `materialsLink` | STRING | |
| `mockTestLink` | STRING | |

### Contact
| Field | Type | Notes |
|---|---|---|
| `id` | INTEGER PK | |
| `fullName` | STRING | |
| `email` | STRING | |
| `phone` | STRING | |
| `subject` | STRING | |
| `message` | TEXT | |
| `userId` | FK (User) | Nullable |

### Mock (Mock Test Result)
| Field | Type | Notes |
|---|---|---|
| `id` | INTEGER PK | |
| `Title` | STRING | |
| `Week` | STRING | e.g. "Week 10" |
| `Description` | TEXT | |
| `Img` | STRING | Image URL |

### Notice
| Field | Type | Notes |
|---|---|---|
| `id` | INTEGER PK | |
| `Title` | STRING | |
| `Description` | TEXT | |
| `Img` | STRING | |

### PaymentReceipt
| Field | Type | Notes |
|---|---|---|
| `id` | INTEGER PK | |
| `reference` | STRING | Bank transaction ref |
| `receipt` | STRING | Cloudinary URL |
| `notes` | TEXT | |
| `course` | STRING | Course name |
| `userName` | STRING | |
| `userEmail` | STRING | |
| `status` | STRING, default: 'pending' | 'pending' / 'verified' |
| `userId` | FK (User) | |
| `courseId` | FK (Course) | |

### ContentBlock (created during admin separation)
| Field | Type | Notes |
|---|---|---|
| `key` | STRING PK | e.g. "hero_heading" |
| `value` | TEXT | Can be JSON string for complex data |
| `createdAt` | TIMESTAMP | |
| `updatedAt` | TIMESTAMP | |

### Associations (Model/index.js)
- `PaymentReceipt.belongsTo(User)` via `userId`
- `PaymentReceipt.belongsTo(Course)` via `courseId`
- `Contact.belongsTo(User)` via `userId`
- `User.belongsToMany(Course)` through `Enrollments` (many-to-many)

---

## API Routes

### Public (No Auth Required)
| Method | Path | Handler | Description |
|---|---|---|---|
| GET | `/auth/google` | `passportAuth` | Start Google OAuth |
| GET | `/auth/google/callback` | `callback` | OAuth callback handler |
| GET | `/auth/user` | `getuser` | Get current user (returns null if not auth'd) |
| GET | `/auth/logout` | `logout` | Destroy session |
| GET | `/api/course` | `getCourse` | List all courses |
| GET | `/api/course/:title` | `getCourseByTitle` | Get course by title (URL-encoded) |
| POST | `/api/contact` | `postContact` | Submit contact form |
| GET | `/api/mock/get` | `getMock` | Paginated mock results |
| GET | `/api/mock/get/:id` | `getMockById` | Single mock result |
| GET | `/api/notice/get` | `getNotice` | Paginated notices |
| GET | `/api/notice/get/:id` | `getNoticeById` | Single notice |
| POST | `/api/payment/receipt` | `submitReceipt` | User submits payment receipt |
| GET | `/api/content` | `getContent` | Get all content blocks |

### Auth Required (Any logged-in user)
| Method | Path | Handler | Description |
|---|---|---|---|
| PUT | `/auth/update` | (inline) | Update user displayName |

### Admin Only (`isAdmin` middleware)
| Method | Path | Handler | Description |
|---|---|---|---|
| POST | `/api/course` | `createCourse` | Create course |
| GET | `/api/course/id/:id` | `getCourseById` | Get course by PK ID |
| PUT | `/api/course/:id` | `updateCourse` | Update course |
| DELETE | `/api/course/:id` | `deleteCourse` | Delete course |
| POST | `/api/mock/post` | `postMock` | Create mock result |
| POST | `/api/mock/delete` | `deleteMock` | Delete mock result |
| POST | `/api/notice/post` | `postNotice` | Create notice |
| POST | `/api/notice/delete` | `deleteNotice` | Delete notice |
| PUT | `/api/notice/update` | `updateNotice` | Update notice |
| GET | `/api/payment/receipts` | `getAllReceipts` | List all receipts |
| PATCH | `/api/payment/receipt/:id` | `updateReceiptStatus` | Mark as verified |
| GET | `/api/contact` | `getContacts` | List contact submissions |
| PUT | `/api/content` | `updateContent` | Batch update content blocks |

---

## Auth Flow

### Google OAuth (Session-based)

```
User → /auth/google → Google OAuth screen → callback → redirect to CLIENT_URL/profile
```

- Admin email is hardcoded: `ashishkhadka317@gmail.com`
- On login, if user email matches admin email, `isAdmin` is set to `true`
- Session stored in PostgreSQL via `connect-pg-simple`
- Cookie: `httpOnly`, `sameSite: 'lax'` (dev) / `'none'` (prod), `secure` (prod only)
- Session maxAge: 24 hours

### Admin Dashboard Auth Flow

```
Admin visits admin dashboard → fetch /auth/user
  → not authenticated → show Login page → redirect to /auth/google
  → OAuth callback → redirects to CLIENT_URL/profile
  → session cookie is domain-wide (port-agnostic in dev)
  → admin navigates to admin dashboard URL
  → fetch /auth/user → isAdmin: true → show dashboard
```

### isAdmin Middleware

```js
// Middleware/adminAuth.js
export const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Not authenticated" });
  }
  if (!req.user?.isAdmin) {
    return res.status(403).json({ msg: "Forbidden: Admin access required" });
  }
  return next();
};
```

---

## Code Conventions

### Backend Controllers

```js
export const handlerName = async (req, res) => {
    try {
        // logic here
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error message", error)
        return res.status(500).json({ msg: "Error message" })
    }
}
```

### Backend Routes

```js
import express from 'express'
const router = express.Router();
import { handler } from '../Controller/File.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

router.get("/path", handler)              // public
router.post("/path", isAdmin, handler)    // admin-only

export default router;
```

### Backend Models

```js
import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const ModelName = sequelize.define('ModelName', {
    field: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

export default ModelName;
```

### Frontend Components

- Function components with default export
- Named exports for route wrappers
- API calls via `api` (axios instance from `config/api.js`)
- Redux: `useSelector` for reading state, `useDispatch` for actions
- Content: use `useContent()` hook with `site.js` fallbacks

### Frontend API Calls

```jsx
import api from '../config/api'

const fetchData = async () => {
  const res = await api.get('/api/course')
  setData(res.data)
}
```

### Cloudinary Image Upload

```jsx
const uploadFile = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "image_preset");
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data
  );
  return res.data.secure_url;
};
```

---

## Configuration

### Backend (`backend/.env`)
| Variable | Default | Notes |
|---|---|---|
| `PORT` | 5000 | Currently set to 5001 (port 5000 taken by macOS) |
| `DB_HOST` | localhost | |
| `DB_PORT` | 5432 | Currently set to 5433 |
| `DB_NAME` | aone | Currently set to "institute" |
| `DB_USER` | postgres | |
| `DB_PASSWORD` | | |
| `SESSION_SECRET` | fallback-secret | |
| `GOOGLE_CLIENT_ID` | | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | | |
| `GOOGLE_CALLBACK_URL` | | Must match Google Cloud Console |
| `CLIENT_URL` | http://localhost:5173 | Where to redirect after OAuth |

### Frontend (`frontend/.env`)
| Variable | Default | Notes |
|---|---|---|
| `VITE_SITE_URL` | | |
| `VITE_CLOUDINARY_CLOUD` | drsfbaluf | |
| `VITE_CLOUDINARY_PRESET` | image_preset | |
| `VITE_FACEBOOK_URL` | | |
| `VITE_INSTAGRAM_URL` | | |
| `VITE_TIKTOK_URL` | | |
| `VITE_WHATSAPP_NUMBER` | 9779843340238 | |

### Vite Proxy (`frontend/vite.config.js`)
- Dev server on port 5173
- `/api` → `http://localhost:5001`
- `/auth` → `http://localhost:5001`

### Admin Vite Proxy (`admin/vite.config.js`)
- Dev server on port 5174
- `/api` → `http://localhost:5001`
- `/auth` → `http://localhost:5001`

---

## Run Commands

```bash
# Backend (from Institute/backend/)
npm run dev          # Nodemon, port 5001

# Public frontend (from Institute/frontend/)
npm run dev          # Vite, port 5173
npm run build        # Production build to dist/
npm run lint         # ESLint

# Admin dashboard (from Institute/admin/)
npm run dev          # Vite, port 5174
npm run build        # Production build

# Seed database (from Institute/backend/)
node seed.js
```

---

## Known Bugs & Fixes Status

| Bug | Status |
|---|---|
| `postNotice` returns no response | ✅ Fixed (added `res.status(201).json(notice)`) |
| `postMock` returns no response | 🔧 To fix (same pattern) |
| `postContact` returns no response | 🔧 To fix (same pattern) |
| Payment endpoints (`GET /receipts`, `PATCH /receipt/:id`) have no auth | 🔧 To fix (add `isAdmin` middleware) |
| CORS missing admin URL (`localhost:5174`) | 🔧 To fix (add to whitelist) |
| Footer copyright hardcoded 2025 | ✅ Fixed (now uses `new Date().getFullYear()`) |
| Frontend API baseURL hardcoded to production | ✅ Fixed (uses Vite proxy in dev, production URL in build) |

---

## Important Gotchas

1. **Express 5:** Uses `path-to-regexp` v8 — route parameter matching may differ from Express 4
2. **Port 5000** is used by macOS ControlCenter (AirTunes). Backend configured for port 5001
3. **Session cookies** are domain-scoped (port-agnostic). `localhost:5173` and `localhost:5174` share cookies in dev
4. **Route order matters** in Express — more specific routes must come before less specific ones (e.g., `GET /id/:id` before `GET /:title`)
5. **Admin email** is hardcoded in `Server.js:71` — change to use env var for flexibility
6. **No migrations** — Sequelize `sync()` auto-creates/updates tables on every start
7. **Models use `sequelize.define()`** pattern (not class-based)
8. **Contact, Mock, Notice routes** use non-RESTful patterns (e.g., `POST /delete` with body `{ id }`)
9. **Cloudinary** uses unsigned upload preset — any client can upload images
10. **ContentContext** in the public frontend fetches dynamic content with `site.js` values as fallback defaults

---

## Deployment

### Current URLs
- Backend: `https://institute-xi.vercel.app`
- Frontend: `https://institute-frontend-gamma.vercel.app`

### Planned Production Setup (with Custom Domain)
- Frontend: `https://mirroracademy.com`
- Admin: `https://admin.mirroracademy.com`
- Backend: `https://api.mirroracademy.com`

For cookie-based auth to work across subdomains, the cookie `Domain` must be set to `.mirroracademy.com`. This requires deploying the backend on the same custom domain.
