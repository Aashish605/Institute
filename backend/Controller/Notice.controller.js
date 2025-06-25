import Notice from '../Model/Notice.model.js'

export const postNotice = async (req, res) => {
    let { Title, Description, Img } = req.body;
    try {
        const data = new Notice({
            Title,
            Description,
            Img
        })
        await data.save();
    } catch (error) {
        console.error("Error during saving the data", error)
        return res.status(500).json({ msg: "Error saving data" })
    }
}


export const getNotice = async (req, res) => {
    try {
        const data = await Notice.find()
        return res.json(data);
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}

export const deleteNotice = async (req, res) => {
    console.log(req.body.id);
    try {
        const remove = await Notice.deleteOne({ _id: req.body.id });
        return res.json(remove)
    } catch (error) {
        console.error("Error deleting the data", error)
        return res.status(500).json({ msg: "Error deleting data" })
    }
}