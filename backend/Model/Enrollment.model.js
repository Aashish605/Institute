import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
    },
    courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Courses', key: 'id' },
    },
    batch: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

export default Enrollment;
