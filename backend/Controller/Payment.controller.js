import { Op } from 'sequelize';
import { Payment, Course, Enrollment } from '../Model/index.js';

export const submitReceipt = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ msg: "Not authenticated" });
    }
    try {
        const { reference, receipt, notes, course, userName, userEmail, paymentType } = req.body;
        if ( !receipt || !course || !userName || !userEmail) {
            return res.status(400).json({ msg: "Missing required fields" });
        }
        const courseMatch = await Course.findOne({ where: { title: course } });
        const payment = await Payment.create({
            reference,
            receipt,
            notes,
            course,
            userName,
            userEmail,
            userId: req.user?.id || null,
            courseId: courseMatch?.id || null,
            paymentType: paymentType || 'cash',
        });
        res.status(201).json({ msg: "Payment receipt submitted", payment });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const getMyCourses = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ msg: "Not authenticated" });
    try {
        const payments = await Payment.findAll({
            where: { userId: req.user.id, status: 'verified' },
            include: [{ model: Course, attributes: ['id', 'title', 'image', 'newPrice'] }],
            order: [['createdAt', 'DESC']],
        });

        const enrollments = await Enrollment.findAll({
            where: { userId: req.user.id },
            include: [{ model: Course, attributes: ['id', 'title', 'image', 'newPrice'] }],
            order: [['createdAt', 'DESC']],
        });

        const enriched = enrollments.map(e => ({
            id: e.id,
            createdAt: e.createdAt,
            Course: e.Course,
            source: 'enrollment',
        }));

        const paid = payments.map(r => ({
            id: r.id,
            createdAt: r.createdAt,
            Course: r.Course,
            source: 'payment',
        }));

        const merged = [...paid, ...enriched].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(merged);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const getAllReceipts = async (req, res) => {
    try {
        const where = {};
        if (req.query.email) where.userEmail = req.query.email;
        if (req.query.search) {
            const q = `%${req.query.search}%`;
            where[Op.or] = [
                { userName: { [Op.iLike]: q } },
                { userEmail: { [Op.iLike]: q } },
                { course: { [Op.iLike]: q } },
                { reference: { [Op.iLike]: q } },
                { notes: { [Op.iLike]: q } },
            ];
        }
        const payments = await Payment.findAll({ where, order: [['createdAt', 'DESC']] });
        res.json(payments);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const updateReceiptStatus = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) return res.status(404).json({ msg: "Receipt not found" });
        await payment.update({ status: req.body.status });

        if (req.body.status === 'verified' && payment.userId && payment.courseId) {
            await Enrollment.findOrCreate({
                where: {
                    userId: payment.userId,
                    courseId: payment.courseId,
                }
            });
        }

        res.json(payment);
    } catch (err) {
        res.status(500).json({ msg: "Failed to update status" });
    }
};