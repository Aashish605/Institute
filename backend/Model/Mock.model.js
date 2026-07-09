import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const Mock = sequelize.define('Mock', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    Title: { type: DataTypes.STRING, allowNull: false },
    Week: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.TEXT, allowNull: false },
    FileUrl: { type: DataTypes.STRING, allowNull: true },
    FileType: { type: DataTypes.STRING, allowNull: true },
}, {
    timestamps: true,
});

export default Mock;
