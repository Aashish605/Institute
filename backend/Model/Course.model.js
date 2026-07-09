import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    oldPrice: { type: DataTypes.FLOAT, allowNull: false },
    newPrice: { type: DataTypes.FLOAT, allowNull: false },
    discount: { type: DataTypes.STRING, allowNull: false },
    features: { type: DataTypes.JSONB, allowNull: false },
    subjects: { type: DataTypes.JSONB, allowNull: false },
    materialsLink: { type: DataTypes.STRING, allowNull: false },
    mockTestLink: { type: DataTypes.STRING },
}, {
    timestamps: true,
});

export default Course;
