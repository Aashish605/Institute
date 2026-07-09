import { Course } from '../Model/index.js'

export const getCourse = async (req, res) => {
    try {
        const data = await Course.findAll()
        return res.json(data);
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}

export const getCourseByTitle = async (req, res) => {
    try {
        const data = await Course.findOne({ where: { title: req.params.title } });
        if (!data) return res.status(404).json({ msg: "Not found" });
        
        let isEnrolled = false;
        if (req.isAuthenticated() && req.user) {
            const { Enrollment } = await import('../Model/index.js');
            const enrollment = await Enrollment.findOne({
                where: {
                    userId: req.user.id,
                    courseId: data.id
                }
            });
            isEnrolled = !!enrollment;
        }

        const plainData = data.get({ plain: true });
        plainData.isEnrolled = isEnrolled;

        return res.json(plainData);
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const data = await Course.findByPk(req.params.id);
        if (!data) return res.status(404).json({ msg: "Not found" });
        return res.json(data);
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}

export const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        return res.status(201).json(course);
    } catch (error) {
        console.error("Error creating course", error)
        return res.status(500).json({ msg: "Error creating course" })
    }
}

export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({ msg: "Course not found" });
        await course.update(req.body);
        return res.json(course);
    } catch (error) {
        console.error("Error updating course", error)
        return res.status(500).json({ msg: "Error updating course" })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const deleted = await Course.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ msg: "Course not found" });
        return res.json({ msg: "Course deleted" });
    } catch (error) {
        console.error("Error deleting course", error)
        return res.status(500).json({ msg: "Error deleting course" })
    }
}
