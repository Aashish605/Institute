export const isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ msg: "Not authenticated" });
    }
    const adminEmail = process.env.ADMIN_EMAIL || 'ashishkhadka317@gmail.com';
    if (!req.user?.isAdmin && req.user?.email !== adminEmail) {
        return res.status(403).json({ msg: "Forbidden: Admin access required" });
    }
    return next();
};
