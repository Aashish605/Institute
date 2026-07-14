import { Enrollment, User, Course, Payment } from '../Model/index.js';
import { Op } from 'sequelize';

export const getBatches = async (req, res) => {
    try {
        const enrollmentBatches = await Enrollment.findAll({
            attributes: ['batch'],
            where: { batch: { [Op.ne]: null, [Op.ne]: '' } },
            group: ['batch'],
            order: [['batch', 'ASC']],
        });
        const courses = await Course.findAll({
            attributes: ['batches'],
            where: { batches: { [Op.ne]: null } },
        });
        const courseBatches = courses.flatMap(c => c.batches || []);
        const all = [...enrollmentBatches.map(b => b.batch), ...courseBatches].filter(Boolean);
        res.json([...new Set(all)].sort());
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const getAllEnrollments = async (req, res) => {
    try {
        const { search, courseId, batch } = req.query;
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
        if (batch) {
            where.batch = batch;
        }

        const enrollments = await Enrollment.findAll({
            where,
            include: [
                { 
                    model: User, 
                    where: Object.keys(userWhere).length ? userWhere : undefined, 
                    attributes: ['id', 'displayName', 'email', 'photo'] 
                },
                { 
                    model: Course, 
                    where: Object.keys(courseWhere).length ? courseWhere : undefined, 
                    attributes: ['id', 'title', 'newPrice'] 
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        // Get payment info for each enrollment
        const payments = await Payment.findAll({
            where: { 
                userId: enrollments.map(e => e.userId), 
                courseId: enrollments.map(e => e.courseId) 
            },
            order: [['createdAt', 'DESC']],
        });

        // Attach latest payment to each enrollment
        const enrollmentsWithPayment = enrollments.map(enrollment => {
            const payment = payments.find(p => 
                p.userId === enrollment.userId && p.courseId === enrollment.courseId
            );
            return {
                ...enrollment.toJSON(),
                Payment: payment || null,
            };
        });

        res.json(enrollmentsWithPayment);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const createEnrollment = async (req, res) => {
    try {
        const { userId, courseId, batch, paymentType, reference, receipt, notes, totalFee, paidAmount, paymentStatus, remarks } = req.body;
        if (!userId || !courseId) {
            return res.status(400).json({ msg: "userId and courseId are required" });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const course = await Course.findByPk(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        const [enrollment, created] = await Enrollment.findOrCreate({
            where: { userId, courseId },
            defaults: batch ? { batch } : undefined,
        });

        if (!created && batch) {
            await enrollment.update({ batch });
        }

        if (!created) {
            return res.status(409).json({ msg: "User is already enrolled in this course" });
        }

        // Use course price as default totalFee if not provided
        const finalTotalFee = totalFee !== undefined ? parseFloat(totalFee) : course.newPrice;
        const finalPaidAmount = paidAmount !== undefined ? parseFloat(paidAmount) : 0;
        const finalPaymentStatus = paymentStatus || (finalPaidAmount >= finalTotalFee ? 'completed' : 'remaining');

        await Payment.create({
            userId,
            courseId,
            course: course.title,
            userName: user.displayName || user.email,
            userEmail: user.email,
            reference: reference || null,
            receipt: receipt || '',
            notes: notes || null,
            paymentType: paymentType || 'cash',
            status: 'verified',
            totalFee: finalTotalFee,
            paidAmount: finalPaidAmount,
            paymentStatus: finalPaymentStatus,
            remarks: remarks || null,
        });

        const populated = await Enrollment.findByPk(enrollment.id, {
            include: [
                { model: User, attributes: ['id', 'displayName', 'email', 'photo'] },
                { model: Course, attributes: ['id', 'title', 'newPrice'] },
            ],
        });

        // Attach payment info
        const payment = await Payment.findOne({
            where: { userId, courseId },
            order: [['createdAt', 'DESC']],
        });

        const result = {
            ...populated.toJSON(),
            Payment: payment || null,
        };

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export const updateEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalFee, paidAmount, paymentStatus, remarks, receipt, reference, notes, batch } = req.body;

        const enrollment = await Enrollment.findByPk(id, {
            include: [
                { model: User, attributes: ['id', 'displayName', 'email'] },
                { model: Course, attributes: ['id', 'title'] },
            ],
        });

        if (!enrollment) return res.status(404).json({ msg: "Enrollment not found" });

        // Find the associated payment
        const payment = await Payment.findOne({
            where: { userId: enrollment.userId, courseId: enrollment.courseId },
            order: [['createdAt', 'DESC']],
        });

        if (!payment) return res.status(404).json({ msg: "Payment record not found" });

        // Update enrollment batch
        if (batch !== undefined) {
            await enrollment.update({ batch });
        }

        // Update payment fields
        const updateData = {};
        if (totalFee !== undefined) updateData.totalFee = parseFloat(totalFee);
        if (paidAmount !== undefined) updateData.paidAmount = parseFloat(paidAmount);
        if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;
        if (remarks !== undefined) updateData.remarks = remarks;
        if (receipt !== undefined) updateData.receipt = receipt;
        if (reference !== undefined) updateData.reference = reference;
        if (notes !== undefined) updateData.notes = notes;

        // Auto-determine paymentStatus if not explicitly provided but paidAmount/totalFee changed
        if (paymentStatus === undefined && (totalFee !== undefined || paidAmount !== undefined)) {
            const newPaid = paidAmount !== undefined ? parseFloat(paidAmount) : payment.paidAmount;
            const newTotal = totalFee !== undefined ? parseFloat(totalFee) : payment.totalFee;
            updateData.paymentStatus = newPaid >= newTotal ? 'completed' : 'remaining';
        }

        await payment.update(updateData);

        // Return updated enrollment with payment
        const updatedPayment = await Payment.findByPk(payment.id);
        const result = {
            ...enrollment.toJSON(),
            Payment: updatedPayment,
        };

        res.json(result);
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