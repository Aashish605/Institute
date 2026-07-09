import { sequelize } from '../Db/db.js';
import User from './User.model.js';
import Course from './Course.model.js';
import Contact from './Contact.model.js';
import Mock from './Mock.model.js';
import Notice from './Notice.model.js';
import Payment from './Payment.model.js';
import ContentBlock from './ContentBlock.model.js';
import Enrollment from './Enrollment.model.js';
import Testimonial from './Testimonial.model.js';

// Payment -> User
Payment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Payment, { foreignKey: 'userId' });

// Payment -> Course
Payment.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Payment, { foreignKey: 'courseId' });

// Contact -> User (optional — null for unauthenticated submissions)
Contact.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Contact, { foreignKey: 'userId' });

// Many-to-many: User <-> Course (enrollments)
User.belongsToMany(Course, { through: Enrollment, foreignKey: 'userId' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'courseId' });

Enrollment.belongsTo(User, { foreignKey: 'userId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

const db = {
    sequelize,
    User,
    Course,
    Contact,
    Mock,
    Notice,
    Payment,
    ContentBlock,
    Enrollment,
    Testimonial,
};

export default db;
export { sequelize, User, Course, Contact, Mock, Notice, Payment, ContentBlock, Enrollment, Testimonial };
