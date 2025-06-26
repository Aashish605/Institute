import passport from 'passport';

export const passportAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const callback = [
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("https://institute-frontend-gamma.vercel.app/profile");
    }
];

export const getuser = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            user: {
                displayName: req.user.displayName,
                email: req.user.email,
                photo: req.user.photo,
                isAdmin: req.user.isAdmin // <-- Add this line
            }
        });
    } else {
        res.status(401).json({ user: null });
    }
};

export const logout = (req, res) => {
    req.logout(() => {
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.sendStatus(200);
    });
};