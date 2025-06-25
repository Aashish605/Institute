import Course from '../Model/Course.model.js'

export const getCourse = async (req, res) => {
    try {
        const data = await Course.find()
        return res.json(data);
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}