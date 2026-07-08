import passport from 'passport';

export const passportAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const callback = [
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        const redirectUrl = req.user.isAdmin
            ? process.env.ADMIN_URL || `${process.env.CLIENT_URL}/profile`
            : `${process.env.CLIENT_URL}/profile`;
        res.redirect(redirectUrl);
    }
];

export const getuser = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            user: {
                displayName: req.user.displayName,
                email: req.user.email,
                photo: req.user.photo,
                contact: req.user.contact,
                number: req.user.number,
                class: req.user.class,
                isAdmin: req.user.isAdmin
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