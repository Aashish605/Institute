import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const PaymentReceipt = sequelize.define('PaymentReceipt', {
    reference: { type: DataTypes.STRING },
    receipt: { type: DataTypes.STRING, allowNull: false },
    notes: { type: DataTypes.TEXT },
    course: { type: DataTypes.STRING, allowNull: false },
    userName: { type: DataTypes.STRING, allowNull: false },
    userEmail: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
}, {
    timestamps: true,
});

export default PaymentReceipt;
