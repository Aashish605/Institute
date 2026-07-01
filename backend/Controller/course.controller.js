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
        return res.json(data);
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}