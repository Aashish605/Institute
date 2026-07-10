import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../Model/index.js';

const adminEmail = process.env.ADMIN_EMAIL || 'ashishkhadka317@gmail.com';

const configurePassport = () => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const normalizedEmail = email.toLowerCase().trim();
                const user = await User.findOne({ where: { email: normalizedEmail } });

                if (!user || !user.password) {
                    return done(null, false, { message: 'Invalid email or password.' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Invalid email or password.' });
                }

                if (!user.isEmailVerified) {
                    return done(null, false, { message: 'Please verify your email address before logging in.', unverified: true });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        })
    );

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://institute-backend-eight.vercel.app/auth/google/callback'
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value?.toLowerCase();
                let user = await User.findOne({ where: { googleId: profile.id } });

                if (!user && email) {
                    user = await User.findOne({ where: { email } });
                }

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email,
                        photo: profile.photos?.[0]?.value,
                        isAdmin: email === adminEmail,
                        isEmailVerified: true,
                    });
                } else {
                    const updates = {};
                    if (!user.googleId) updates.googleId = profile.id;
                    if (!user.displayName && profile.displayName) updates.displayName = profile.displayName;
                    if (!user.photo && profile.photos?.[0]?.value) updates.photo = profile.photos[0].value;
                    if (!user.email && email) updates.email = email;
                    if ((email === adminEmail) && !user.isAdmin) updates.isAdmin = true;
                    if (!user.isEmailVerified) updates.isEmailVerified = true;

                    if (Object.keys(updates).length) {
                        await user.update(updates);
                    }
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};

export default configurePassport;
