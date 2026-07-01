import { Notice } from '../Model/index.js'

export const postNotice = async (req, res) => {
    let { Title, Description, Img } = req.body;
    try {
        await Notice.create({ Title, Description, Img });
    } catch (error) {
        console.error("Error during saving the data", error)
        return res.status(500).json({ msg: "Error saving data" })
    }
}


export const getNotice = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const offset = (page - 1) * limit;
        const { rows, count } = await Notice.findAndCountAll({
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

export const getNoticeById = async (req, res) => {
    try {
        const data = await Notice.findByPk(req.params.id);
        if (!data) return res.status(404).json({ msg: "Not found" });
        return res.json(data);
    } catch (error) {
        console.error("Error during getting the data", error)
        return res.status(500).json({ msg: "Error getting data" })
    }
}

export const deleteNotice = async (req, res) => {
    console.log(req.body.id);
    try {
        const remove = await Notice.destroy({ where: { id: req.body.id } });
        return res.json(remove)
    } catch (error) {
        console.error("Error deleting the data", error)
        return res.status(500).json({ msg: "Error deleting data" })
    }
}

export const updateNotice = async (req, res) => {
    let { Id, Title, Description, Img } = req.body;

    try {
        const existingNotice = await Notice.findByPk(Id);
        if (!existingNotice) {
            return res.status(404).json({ msg: "Notice not found" })
        }
        existingNotice.Title = Title;
        existingNotice.Description = Description;
        existingNotice.Img = Img;
        await existingNotice.save();
        return res.status(200).json(existingNotice)
    } catch (error) {
        console.error("Error updating the data", error)
        return res.status(500).json({ msg: "Error updating data" })
    }
}

