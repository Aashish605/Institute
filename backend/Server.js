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
import paymentReceiptRoutes from './Routes/PaymentReceipt.route.js';
import contentRoutes from './Routes/Content.route.js';
import testimonialRoutes from './Routes/Testimonial.route.js';
import userRoutes from './Routes/User.route.js';
import enrollmentRoutes from './Routes/Enrollment.route.js';

const app = express()
app.use(express.json())

app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "https://institute-frontend-gamma.vercel.app",
                "http://localhost:5173",
                "http://localhost:5174"
            ];
            if (!origin || allowedOrigins.includes(origin)) {
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

app.use(session({
    store: new PostgreSQLStore({
        conString: `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'aone'}`,
        createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "fallback-secret",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
    }
}))

app.use(passport.initialize())
app.use(passport.session())
configurePassport()

app.use('/api/contact', contactRoutes)
app.use('/api/mock', mockRoutes)
app.use('/api/notice', noticeRoutes)
app.use('/api/course', courseRoutes)
app.use("/auth", authRoutes)
app.use('/api/payment', paymentReceiptRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/testimonial', testimonialRoutes)
app.use('/api/user', userRoutes)
app.use('/api/enrollment', enrollmentRoutes)


const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error.message);
        process.exit(1);
    }
};

startServer();

export default app;