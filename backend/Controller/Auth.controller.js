import crypto from 'crypto';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { User } from '../Model/index.js';

const adminEmail = process.env.ADMIN_EMAIL || 'ashishkhadka317@gmail.com';

const serializeUser = (user) => ({
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    photo: user.photo,
    contact: user.contact,
    number: user.number,
    class: user.class,
    isAdmin: user.isAdmin,
});

export const passportAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
        return res.status(400).json({ message: 'Please provide your name, email, and password.' });
    }

    try {
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ where: { email: normalizedEmail } });

        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            displayName: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            isAdmin: normalizedEmail === adminEmail,
        });

        req.logIn(newUser, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(201).json({ user: serializeUser(newUser) });
        });
    } catch (err) {
        next(err);
    }
};

export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({ message: info?.message || 'Invalid email or password.' });
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.json({ user: serializeUser(user) });
        });
    })(req, res, next);
};

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email?.trim()) {
        return res.status(400).json({ message: 'Please provide your email address.' });
    }

    try {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ where: { email: normalizedEmail } });

        if (!user) {
            return res.json({ message: 'If an account exists for that email, a reset link has been generated.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

        await user.update({ resetToken: token, resetTokenExpires: expiresAt });

        return res.json({
            message: 'If an account exists for that email, a reset link has been generated.',
            resetToken: token,
            resetLink: `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${token}`
        });
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req, res, next) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ message: 'Reset token and password are required.' });
    }

    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpires: { [User.sequelize.Sequelize.Op.gt]: new Date() },
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'This reset link is invalid or has expired.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await user.update({
            password: hashedPassword,
            resetToken: null,
            resetTokenExpires: null,
        });

        return res.json({ message: 'Password updated successfully.' });
    } catch (err) {
        next(err);
    }
};

export const callback = [
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const redirectUrl = req.user?.isAdmin
            ? process.env.ADMIN_URL || `${process.env.CLIENT_URL}/profile`
            : `${process.env.CLIENT_URL}/profile`;
        res.redirect(redirectUrl);
    }
];

export const getuser = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: serializeUser(req.user) });
    } else {
        res.status(401).json({ user: null });
    }
};

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed.' });
        }
        req.session.destroy();
        res.clearCookie('connect.sid');
        return res.sendStatus(200);
    });
};