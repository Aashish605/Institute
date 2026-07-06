export const isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ msg: "Not authenticated" });
    }
    if (!req.user?.isAdmin) {
        return res.status(403).json({ msg: "Forbidden: Admin access required" });
    }
    return next();
};
