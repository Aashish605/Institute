import { Mock } from '../Model/index.js'

export const postMock = async (req, res) => {
    let { Title, Week, Description, Img } = req.body;
    try {
        await Mock.create({ Title, Week, Description, Img });
    } catch (error) {
        console.error("Error during saving the data", error)
        return res.status(500).json({ msg: "Error saving data" })
    }
}

export const getMock = async (req, res) => {
    try {
        const data = await Mock.findAll()
        return res.json(data);
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
    console.log(req.body.id);
    try {
        const remove = await Mock.destroy({ where: { id: req.body.id } });
        return res.json(remove)
    } catch (error) {
        console.error("Error deleting the data", error)
        return res.status(500).json({ msg: "Error deleting data" })
    }
}