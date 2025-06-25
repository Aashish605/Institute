import express from "express";
import cors from 'cors';
import ConnectDB from './Db/db.js'
import dotenv from 'dotenv'
dotenv.config()
import passport, { Passport } from 'passport'
import session from 'express-session'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import contactRoutes from './Routes/Contact.route.js'
import mockRoutes from './Routes/Mock.route.js'
import noticeRoutes from './Routes/Notice.route.js'
import courseRoutes from './Routes/Course.route.js'
import User from './Model/User.model.js';
import authRoutes from './Routes/Auth.route.js'
import paymentReceiptRoutes from './Routes/PaymentReceipt.route.js';

const app = express()
app.use(express.json())

app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "https://institute-frontend-gamma.vercel.app",
                "http://localhost:5173"
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

app.use(session({
    secret: "secret",
    resave: true,
    proxy: true,
    saveUninitialized: true,
    cookie: {
        secure:true,
        httpOnly:true,
        sameSite:'none',
        maxAge: 24 * 60 * 60 * 1000,
        path:'/'
    } 
}))

app.use(passport.initialize())
app.use(passport.session())


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const adminEmail = "ashishkhadka317@gmail.com"; // <-- Set your admin Gmail here
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value,
                    isAdmin: profile.emails[0].value === adminEmail, // <-- Set admin flag
                });
            } else if (profile.emails[0].value === adminEmail && !user.isAdmin) {
                user.isAdmin = true;
                await user.save();
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id); // Use MongoDB _id
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


app.use('/', (req, res) => {
    res.send("hello i am aashish")
}
)
app.use('/api/contact', contactRoutes)
app.use('/api/mock', mockRoutes)
app.use('/api/notice', noticeRoutes)
app.use('/api/course', courseRoutes)
app.use("/auth", authRoutes)
app.use('/api/payment', paymentReceiptRoutes)


const startServer = async () => {
    try {
        await ConnectDB();
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