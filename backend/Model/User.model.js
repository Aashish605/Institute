import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    googleId: { type: DataTypes.STRING, allowNull: true, unique: true },
    displayName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: true },
    photo: { type: DataTypes.STRING },
    age: { type: DataTypes.STRING },
    number: { type: DataTypes.STRING },
    class: { type: DataTypes.STRING },
    school: { type: DataTypes.STRING },
    resetToken: { type: DataTypes.STRING, allowNull: true },
    resetTokenExpires: { type: DataTypes.DATE, allowNull: true },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    emailVerifyToken: { type: DataTypes.STRING, allowNull: true },
    emailVerifyExpires: { type: DataTypes.DATE, allowNull: true },
}, {
    timestamps: true,
});

export default User;
