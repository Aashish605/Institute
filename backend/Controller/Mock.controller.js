import Mock from '../Model/Mock.model.js'

export const postMock = async (req, res) => {
    let { Title, Week, Description, Img } = req.body;
    try {
        const data = new Mock({
            Title,
            Week,
            Description,
            Img
        })
        await data.save();
    } catch (error) {
        console.error("Error during saving the data", error)
        return res.status(500).json({ msg: "Error saving data" })
    }
}

export const getMock = async (req, res) => {
    try {
        const data = await Mock.find()
        return res.json(data);
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}

export const deleteMock = async (req,res) => {
    console.log(req.body.id);
    try {
        const remove = await Mock.deleteOne({ _id: req.body.id });
        return res.json(remove)
    } catch (error) {
        console.error("Error deleting the data", error)
        return res.status(500).json({ msg: "Error deleting data" })
    }
}