import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: { type: DataTypes.UUID, allowNull: false },
    courseId: { type: DataTypes.UUID, allowNull: true },
    reference: { type: DataTypes.STRING },
    receipt: { type: DataTypes.STRING, allowNull: false },
    notes: { type: DataTypes.TEXT },
    course: { type: DataTypes.STRING, allowNull: false },
    userName: { type: DataTypes.STRING, allowNull: false },
    userEmail: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    paymentType: { type: DataTypes.ENUM('cash', 'online'), defaultValue: 'cash' },
    // New fields for enrollment payment tracking
    totalFee: { type: DataTypes.FLOAT, allowNull: true },
    paidAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
    paymentStatus: { 
        type: DataTypes.ENUM('completed', 'remaining'), 
        defaultValue: 'remaining' 
    },
    remarks: { type: DataTypes.TEXT },
}, {
    timestamps: true,
});

export default Payment;