import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const ContentBlock = sequelize.define('ContentBlock', {
    key: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    value: { type: DataTypes.TEXT, allowNull: false },
}, {
    timestamps: true,
});

export default ContentBlock;
