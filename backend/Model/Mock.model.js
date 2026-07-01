import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const Mock = sequelize.define('Mock', {
    Title: { type: DataTypes.STRING, allowNull: false },
    Week: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.TEXT, allowNull: false },
    Img: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: true,
});

export default Mock;
