import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const Testimonial = sequelize.define('Testimonial', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
    company: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 5 },
}, {
    timestamps: true,
});

export default Testimonial;
