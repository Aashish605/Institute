import { Mock } from '../Model/index.js'

export const postMock = async (req, res) => {
    let { Title, Week, Description, FileUrl, FileType } = req.body;
    try {
        const mock = await Mock.create({ Title, Week, Description, FileUrl, FileType });
        return res.status(201).json(mock);
    } catch (error) {
        console.error("Error during saving the data", error)
        return res.status(500).json({ msg: "Error saving data" })
    }
}

export const getMock = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const offset = (page - 1) * limit;
        const { rows, count } = await Mock.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });
        return res.json({ rows, count, page, totalPages: Math.ceil(count / limit) });
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}

export const getMockById = async (req, res) => {
    try {
        const data = await Mock.findByPk(req.params.id);
        if (!data) return res.status(404).json({ msg: "Not found" });
        return res.json(data);
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}

export const deleteMock = async (req,res) => {
    try {
        const removed = await Mock.destroy({ where: { id: req.body.id } });
        if (!removed) return res.status(404).json({ msg: "Mock result not found" });
        return res.json({ msg: "Mock result deleted" })
    } catch (error) {
        console.error("Error deleting the data", error)
        return res.status(500).json({ msg: "Error deleting data" })
    }
}