import { User } from '../Model/index.js';
import { Op } from 'sequelize';

export const getAllUsers = async (req, res) => {
    try {
        const { search, isAdmin, isEmailVerified } = req.query;
        const where = {};

        if (search) {
            where[Op.or] = [
                { displayName: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { class: { [Op.iLike]: `%${search}%` } },
                { school: { [Op.iLike]: `%${search}%` } },
            ];
        }
        if (isAdmin === 'true') where.isAdmin = true;
        else if (isAdmin === 'false') where.isAdmin = false;
        if (isEmailVerified === 'true') where.isEmailVerified = true;
        else if (isEmailVerified === 'false') where.isEmailVerified = false;

        const users = await User.findAll({
            where,
            attributes: { exclude: ['password', 'resetToken', 'resetTokenExpires', 'emailVerifyToken', 'emailVerifyExpires'] },
            order: [['createdAt', 'DESC']],
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password', 'resetToken', 'resetTokenExpires', 'emailVerifyToken', 'emailVerifyExpires'] }
        });
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        const allowedFields = ['displayName', 'email', 'age', 'number', 'class', 'school', 'isAdmin', 'isEmailVerified'];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        }
        await user.update(updates);
        const refreshed = await User.findByPk(user.id, {
            attributes: { exclude: ['password', 'resetToken', 'resetTokenExpires', 'emailVerifyToken', 'emailVerifyExpires'] }
        });
        res.json(refreshed);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        await user.destroy();
        res.json({ msg: "User deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};
