import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const Contact = sequelize.define('Contact', {
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
}, {
    timestamps: true,
});

export default Contact;
