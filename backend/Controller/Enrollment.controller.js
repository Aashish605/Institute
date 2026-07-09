import { Enrollment, User, Course } from '../Model/index.js';
import { Op } from 'sequelize';

export const getAllEnrollments = async (req, res) => {
    try {
        const { search, courseId } = req.query;
        const where = {};
        const userWhere = {};
        const courseWhere = {};

        if (search) {
            userWhere[Op.or] = [
                { displayName: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
            ];
        }
        if (courseId) {
            where.courseId = courseId;
        }

        const enrollments = await Enrollment.findAll({
            where,
            include: [
                { model: User, where: Object.keys(userWhere).length ? userWhere : undefined, attributes: ['id', 'displayName', 'email', 'photo'] },
                { model: Course, where: Object.keys(courseWhere).length ? courseWhere : undefined, attributes: ['id', 'title'] },
            ],
            order: [['createdAt', 'DESC']],
        });

        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const createEnrollment = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            return res.status(400).json({ msg: "userId and courseId are required" });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const course = await Course.findByPk(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        const [enrollment, created] = await Enrollment.findOrCreate({
            where: { userId, courseId },
        });

        if (!created) {
            return res.status(409).json({ msg: "User is already enrolled in this course" });
        }

        const populated = await Enrollment.findByPk(enrollment.id, {
            include: [
                { model: User, attributes: ['id', 'displayName', 'email', 'photo'] },
                { model: Course, attributes: ['id', 'title'] },
            ],
        });

        res.status(201).json(populated);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByPk(req.params.id);
        if (!enrollment) return res.status(404).json({ msg: "Enrollment not found" });
        await enrollment.destroy();
        res.json({ msg: "Enrollment removed" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};
