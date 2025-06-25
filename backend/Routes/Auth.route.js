import express from 'express';
import User from '../Model/User.model.js';

const router = express.Router();
import { passportAuth, callback, getuser, logout } from '../Controller/Auth.controller.js'

router.get('/google', passportAuth)
router.get('/google/callback', callback)
router.get('/user', getuser)
router.get('/logout', logout)

// Update user number and class
router.put('/update', async (req, res) => {
    if (!req.isAuthenticated()) {
        
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const { name } = req.body;
    try {
        const user = await User.findByIdAndUpdate(

            req.user._id,
            {
                displayName: name,
                contact : Number,
            },
            { new: true }
        );
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Update failed' });
    }
});

export default router;