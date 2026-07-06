import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const User = sequelize.define('User', {
    googleId: { type: DataTypes.STRING, allowNull: false, unique: true },
    displayName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    photo: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING },
    number: { type: DataTypes.STRING },
    class: { type: DataTypes.STRING },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    timestamps: true,
});

export default User;
