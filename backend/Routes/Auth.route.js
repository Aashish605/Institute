import express from 'express';
import { User } from '../Model/index.js';

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
    const { name, contact, number, class: userClass } = req.body;
    try {
        const updateData = { displayName: name };
        if (contact !== undefined) updateData.contact = contact;
        if (number !== undefined) updateData.number = number;
        if (userClass !== undefined) updateData.class = userClass;
        await User.update(updateData, { where: { id: req.user.id } });
        const user = await User.findByPk(req.user.id);
        res.json({ user });
    } catch (err) {
        res.status(500).json({ msg: 'Update failed' });
    }
});

export default router;