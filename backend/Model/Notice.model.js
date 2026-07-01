import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const Notice = sequelize.define('Notice', {
    Title: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.TEXT, allowNull: false },
    Img: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: true,
});

export default Notice;
