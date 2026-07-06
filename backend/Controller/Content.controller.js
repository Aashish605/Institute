import { ContentBlock } from '../Model/index.js'

export const getContent = async (req, res) => {
    try {
        const blocks = await ContentBlock.findAll();
        const content = {};
        for (const block of blocks) {
            content[block.key] = block.value;
        }
        return res.json(content);
    } catch (error) {
        console.error("Error getting content", error)
        return res.status(500).json({ msg: "Error getting content" })
    }
}

export const updateContent = async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        if (keys.length === 0) {
            return res.status(400).json({ msg: "No content provided" });
        }
        const entries = keys.map((key) => ({
            key,
            value: typeof req.body[key] === 'string' ? req.body[key] : JSON.stringify(req.body[key]),
        }));
        await ContentBlock.bulkCreate(entries, {
            updateOnDuplicate: ['value', 'updatedAt'],
        });
        const updated = await ContentBlock.findAll();
        const content = {};
        for (const block of updated) {
            content[block.key] = block.value;
        }
        return res.json(content);
    } catch (error) {
        console.error("Error updating content", error)
        return res.status(500).json({ msg: "Error updating content" })
    }
}
