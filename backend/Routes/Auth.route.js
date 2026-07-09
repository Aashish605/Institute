import express from 'express';
import { User } from '../Model/index.js';

const router = express.Router();
import {
    passportAuth,
    callback,
    getuser,
    logout,
    signup,
    login,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
} from '../Controller/Auth.controller.js'

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/verify-email', verifyEmail)
router.post('/resend-verification', resendVerification)
router.get('/google', passportAuth)
router.get('/google/callback', callback)
router.get('/user', getuser)
router.get('/logout', logout)

// Update user number and class
router.put('/update', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const { name, age, number, class: userClass, school, photo } = req.body;
    try {
        const updateData = { displayName: name };
        if (age !== undefined) updateData.age = age;
        if (number !== undefined) updateData.number = number;
        if (userClass !== undefined) updateData.class = userClass;
        if (school !== undefined) updateData.school = school;
        if (photo !== undefined) updateData.photo = photo;
        await User.update(updateData, { where: { id: req.user.id } });
        const user = await User.findByPk(req.user.id);
        res.json({ user });
    } catch (err) {
        res.status(500).json({ msg: 'Update failed' });
    }
});

export default router;