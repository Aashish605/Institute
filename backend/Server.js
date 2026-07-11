import express from "express";
import cors from 'cors';
import { connectDB, sequelize } from './Db/db.js'
import dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import session from 'express-session'
import pgStore from 'connect-pg-simple'
import configurePassport from './Config/passport.js'
import contactRoutes from './Routes/Contact.route.js'
import mockRoutes from './Routes/Mock.route.js'
import noticeRoutes from './Routes/Notice.route.js'
import courseRoutes from './Routes/Course.route.js'
import authRoutes from './Routes/Auth.route.js'
import paymentRoutes from './Routes/Payment.route.js';
import contentRoutes from './Routes/Content.route.js';
import testimonialRoutes from './Routes/Testimonial.route.js';
import userRoutes from './Routes/User.route.js';
import enrollmentRoutes from './Routes/Enrollment.route.js';

const app = express()
app.use(express.json())

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.some(o => origin.startsWith(o.replace(/\/+$/, '')))) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
        exposedHeaders: ["Set-Cookie"]
    })
);

const PostgreSQLStore = pgStore(session)

const isProd = process.env.NODE_ENV === 'production';
app.use(session({
    store: new PostgreSQLStore({
        conString: `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'aone'}${isProd ? '?sslmode=require' : ''}`,
        createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "fallback-secret",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
        secure: isProd,
        httpOnly: true,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
    }
}))

app.use(passport.initialize())
app.use(passport.session())
configurePassport()

// Wait for DB before any route handler
let dbInit = connectDB();
if (process.env.VERCEL) {
    dbInit.catch(err => console.error('DB init failed:', err.message, err.stack));
}

app.get('/',(req, res) => { res.json({ ok: true }) })

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/health/db', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ connected: true });
    } catch (e) {
        res.json({ connected: false, error: e.message });
    }
});

app.use(async (req, res, next) => {
    try { await dbInit; } catch (e) {
        try { dbInit = connectDB(); await dbInit; } catch (e2) {
            return res.status(503).json({ msg: 'DB unavailable' });
        }
    }
    next();
});

app.use('/api/contact', contactRoutes)
app.use('/api/mock', mockRoutes)
app.use('/api/notice', noticeRoutes)
app.use('/api/course', courseRoutes)
app.use("/auth", authRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/testimonial', testimonialRoutes)
app.use('/api/user', userRoutes)
app.use('/api/enrollment', enrollmentRoutes)


if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    const startServer = async () => {
        try {
            await connectDB();
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        } catch (error) {
            console.error("Error starting server:", error.message);
            process.exit(1);
        }
    };
    startServer();
}

export default app;